import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as fse from 'fs-extra';
import chalk from 'chalk';

import { BASE_PATH } from './common';
import { Auxiliary } from './generateAuxiliary';
import { LocalizationSchema } from '@ph-encyclopedia/shared/localization';
import {
  BaseGameDiagnoseSchema,
  DiagnoseDatabaseSchema,
  DiagnoseSchema,
  DiagnosesDict,
  ModdedGameDiagnoseSchema,
  SharedDiagnoseSchema,
} from '@ph-encyclopedia/shared/diagnoses';
import { SymptomSchema } from '@ph-encyclopedia/shared/symptoms';
import {
  DepartmentRef,
  ModdedDepartments,
} from '@ph-encyclopedia/shared/auxiliary';

const BASE_DIAGNOSES_DIR = 'diagnoses';

const alwaysArray = ['ExaminationRef', 'Tag'];
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  isArray: (name) => {
    if (alwaysArray.indexOf(name) !== -1) return true;
  },
});

const diagnoses: DiagnosesDict = {
  er: {},
  surg: {},
  intern: {},
  ortho: {},
  cardio: {},
  neuro: {},
  trauma: {},
  infect: {},
  onco: {},
};

const missingSymptoms: Record<keyof DiagnosesDict, string[]> = {
  er: [],
  surg: [],
  intern: [],
  ortho: [],
  cardio: [],
  neuro: [],
  trauma: [],
  infect: [],
  onco: [],
};

export async function generateDiagnoses(
  localizationDict: Record<string, LocalizationSchema>,
  symptomsDict: Record<string, SymptomSchema>,
  auxDict: Auxiliary
) {
  const inputPath = path.resolve(BASE_PATH, 'input', BASE_DIAGNOSES_DIR);
  const outputPath = path.resolve(BASE_PATH, 'output', BASE_DIAGNOSES_DIR);

  // Get all the xml files inside the `input/diagnoses` directory and loop each
  // to obtain a parsed json per department for further processing.
  const filePaths = await fs.readdir(inputPath, { recursive: true });
  for (const filePath of filePaths) {
    const fullFilePath = path.join(inputPath, filePath);
    const stat = fse.statSync(fullFilePath);

    // Make sure we are not reading a directory.
    if (stat.isFile()) {
      await populateDiagnosesDictionary(
        fullFilePath,
        localizationDict,
        symptomsDict,
        auxDict
      );
    }
  }

  await Promise.all([
    Object.keys(diagnoses).map((dpt) =>
      fse.outputFile(
        path.resolve(outputPath, `diagnoses_${dpt}.json`),
        JSON.stringify(diagnoses[dpt], null, 2)
      )
    ),
  ]);

  await Promise.all([
    Object.entries(missingSymptoms)
      .filter(([, v]) => v.length)
      .map(([dptKey]) =>
        fse.outputFile(
          path.resolve(outputPath, `missing_symptoms_${dptKey}.json`),
          JSON.stringify(missingSymptoms[dptKey], null, 2)
        )
      ),
  ]);

  return diagnoses;
}

async function populateDiagnosesDictionary(
  filePath: string,
  localizationDict: Record<string, LocalizationSchema>,
  symptomsDict: Record<string, SymptomSchema>,
  auxDict: Auxiliary
) {
  const rawDoc = await fse.readFile(filePath);

  // Parse the file content.
  const parsedDoc = parser.parse(rawDoc) as DiagnoseDatabaseSchema;
  const root = parsedDoc.Database.GameDBMedicalCondition;

  for (const child of root) {
    const locName = localizationDict[child.ID]?.i18n.en ?? child.ID;
    const locDesc =
      localizationDict[child.AbbreviationLocID]?.i18n.en ??
      child.AbbreviationLocID;

    const symptomsRules = child.Symptoms.GameDBSymptomRules;
    const mappedSymptoms = symptomsRules
      .map<DiagnoseSchema['symptoms'][number]>((symptom) => {
        /** Check if the provided symptom reference exists, otherwise log an
         * alert about missing symptom. */
        if (
          symptom.GameDBSymptomRef &&
          symptom.GameDBSymptomRef in symptomsDict
        ) {
          const symptomEntry = symptomsDict[symptom.GameDBSymptomRef];
          const examinations =
            Array.isArray(symptomEntry.examinations) &&
            symptomEntry.examinations.length
              ? symptomEntry.examinations
                  .filter((x) => !!x)
                  .map((exm) => ({
                    id: exm.id,
                    name: exm.name,
                    icon_index: exm.icon_index,
                  }))
              : [];

          return {
            id: symptomEntry.id,
            name: symptomEntry.name,
            icon_index: symptomEntry.icon_index,
            hazard: symptomEntry.hazard,
            collapse_sym: symptomEntry.collapse_sym,
            probability: symptom.ProbabilityPercent,
            examinations: examinations,
            treatment: symptomEntry.treatment
              ? {
                  id: symptomEntry.treatment.id,
                  name: symptomEntry.treatment.name,
                  icon_index: symptomEntry.treatment.icon_index,
                }
              : undefined,
          };
        } else {
          // console.log(
          //   chalk.yellow(
          //     `-- Warning: the symptom reference ${symptom.GameDBSymptomRef} does not exist! --`
          //   )
          // );

          /** Save the missing symptoms in each mod field. */
          switch (child.DepartmentRef) {
            case DepartmentRef.DptOncologyDepartment:
              missingSymptoms.onco.push(symptom.GameDBSymptomRef);
              break;
            default:
              break;
          }

          return null;
        }
      })
      .filter((x) => x?.id);

    const newDiagnoseShared: SharedDiagnoseSchema = {
      id: child.ID,
      name: locName,
      description: locDesc,
      icon_index: child.IconIndex + 1,
      symptoms: mappedSymptoms,
      insurance: child.InsurancePayment,
      occurrence: child.OccurrenceRef,
    };

    if (ModdedDepartments.includes(child.DepartmentRef)) {
      /** TODO: We must map this reference into an icon path */
      const newDiagnose: ModdedGameDiagnoseSchema = {
        ...newDiagnoseShared,
        type: 'MODDED',
        bia_ref: child.CustomIconBigAssetRef,
        sia_ref: child.CustomIconSmallAssetRef,
        big_icon_path: auxDict.assetLists[child.CustomIconBigAssetRef]?.icon_path || '',
        small_icon_path: auxDict.assetLists[child.CustomIconSmallAssetRef]?.icon_path || '',
      };
      switch (child.DepartmentRef) {
        case DepartmentRef.DptOncologyDepartment:
          diagnoses.onco[child.ID] ??= newDiagnose;
          break;
        default:
          break;
      }
    } else {
      const newDiagnose: BaseGameDiagnoseSchema = {
        ...newDiagnoseShared,
        type: 'BASE',
      };
      switch (child.DepartmentRef) {
        case DepartmentRef.DptEmergency:
          diagnoses.er[child.ID] ??= newDiagnose;
          break;
        case DepartmentRef.DptGeneralSurgeryDepartment:
          diagnoses.surg[child.ID] ??= newDiagnose;
          break;
        case DepartmentRef.DptInternalMedicineDepartment:
          diagnoses.intern[child.ID] ??= newDiagnose;
          break;
        case DepartmentRef.DptOrthopaedicsAndTraumatology:
          diagnoses.ortho[child.ID] ??= newDiagnose;
          break;
        case DepartmentRef.DptCardiology:
          diagnoses.cardio[child.ID] ??= newDiagnose;
          break;
        case DepartmentRef.DptNeurology:
          diagnoses.neuro[child.ID] ??= newDiagnose;
          break;
        case DepartmentRef.DptTraumatologyDepartment:
          diagnoses.trauma[child.ID] ??= newDiagnose;
          break;
        case DepartmentRef.DptInfectiousDiseasesDepartment:
          diagnoses.infect[child.ID] ??= newDiagnose;
          break;
        default:
          break;
      }
    }
  }
}
