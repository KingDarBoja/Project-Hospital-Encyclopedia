import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as fse from 'fs-extra';
import { LocalizationSchema } from '@ph-encyclopedia/shared/localization';
import { BASE_PATH } from '../common';
import {
  DepartmentRef,
  DiagnoseDatabaseSchema,
  DiagnoseSchema,
  DiagnosesDict,
} from '@ph-encyclopedia/shared/diagnoses';
import { SymptomSchema } from '@ph-encyclopedia/shared/symptoms';

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
};

export async function generateDiagnoses(
  localizationDict: Record<string, LocalizationSchema>,
  symptomsDict: Record<string, SymptomSchema>
) {
  const inputPath = path.resolve(BASE_PATH, 'input', BASE_DIAGNOSES_DIR);
  const outputPath = path.resolve(BASE_PATH, 'output', BASE_DIAGNOSES_DIR);

  // Get all the xml files inside the `input/diagnoses` directory and loop each
  // to obtain a parsed json per department for further processing.
  const filePaths = await fse.readdir(inputPath);
  for (const filePath of filePaths) {
    const fullFilePath = path.join(inputPath, filePath);
    const stat = fse.statSync(fullFilePath);

    // Make sure we are not reading a directory.
    if (stat.isFile()) {
      await populateDiagnosesDictionary(
        fullFilePath,
        localizationDict,
        symptomsDict
      );
    }
  }

  await Promise.all([
    Object.keys(diagnoses).map((dpt) =>
      fse.outputFile(
        path.resolve(outputPath, `diagnoses_${dpt}.json`),
        JSON.stringify(diagnoses[dpt])
      )
    ),
  ]);

  return diagnoses;
}

async function populateDiagnosesDictionary(
  filePath: string,
  localizationDict: Record<string, LocalizationSchema>,
  symptomsDict: Record<string, SymptomSchema>
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

    const newDiagnose: DiagnoseSchema = {
      id: child.ID,
      name: locName,
      description: locDesc,
      icon_index: child.IconIndex + 1,
      symptoms: child.Symptoms.GameDBSymptomRules.map<
        DiagnoseSchema['symptoms'][number]
      >((symptom) => {
        const symptomEntry = symptomsDict[symptom.GameDBSymptomRef];
        return {
          id: symptomEntry.id,
          name: symptomEntry.name,
          icon_index: symptomEntry.icon_index,
          hazard: symptomEntry.hazard,
          collapse_sym: symptomEntry.collapse_sym,
          probability: symptom.ProbabilityPercent,
          examinations: symptomEntry.examinations.map((exm) => ({
            id: exm.id,
            name: exm.name,
            icon_index: exm.icon_index,
          })),
          treatment: symptomEntry.treatment
            ? {
                id: symptomEntry.treatment.id,
                name: symptomEntry.treatment.name,
                icon_index: symptomEntry.treatment.icon_index,
              }
            : undefined,
        };
      }),
      insurance: child.InsurancePayment,
      occurrence: child.OccurrenceRef,
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
