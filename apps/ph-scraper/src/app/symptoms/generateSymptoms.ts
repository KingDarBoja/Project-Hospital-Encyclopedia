import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as chalk from 'chalk';
import { BASE_PATH } from '../common';
import { LocalizationSchema } from '@ph-encyclopedia/shared/localization';
import {
  SymptomDatabaseSchema,
  SymptomSchema,
} from '@ph-encyclopedia/shared/symptoms';
import { Procedures } from '@ph-encyclopedia/shared/procedures';

const BASE_SYMPTOMS_DIR = 'symptoms';

const alwaysArray = ['ExaminationRef'];
const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  isArray: (name) => {
    if (alwaysArray.indexOf(name) !== -1) return true;
  },
});

const symptoms: Record<string, SymptomSchema> = {};

export async function generateSymptoms(
  localizationDict: Record<string, LocalizationSchema>,
  proceduresDict: Procedures
) {
  console.log(chalk.green('4. Started processing of symptoms'));

  const inputPath = path.resolve(BASE_PATH, 'input', BASE_SYMPTOMS_DIR);
  const outputPath = path.resolve(BASE_PATH, 'output', BASE_SYMPTOMS_DIR);

  // Get all the xml files inside the `input/symptoms` directory and loop each
  // to obtain a parsed json for futher processing.
  const filePaths = await fse.readdir(inputPath);
  for (const filePath of filePaths) {
    const fullFilePath = path.join(inputPath, filePath);
    const stat = fse.statSync(fullFilePath);

    // Make sure we are not reading a directory.
    if (stat.isFile()) {
      await populateSymptomsDictionary(
        fullFilePath,
        localizationDict,
        proceduresDict
      );
    }
  }

  await fse.outputFile(
    path.resolve(outputPath, 'symptoms.json'),
    JSON.stringify(symptoms)
  );

  console.log(chalk.green('4. Finished processing of symptoms'));
}

async function populateSymptomsDictionary(
  filePath: string,
  localizationDict: Record<string, LocalizationSchema>,
  proceduresDict: Procedures
) {
  const rawDoc = await fse.readFile(filePath);

  // Parse the file content.
  const parsedDoc = parser.parse(rawDoc) as SymptomDatabaseSchema;
  const root = parsedDoc.Database.GameDBSymptom;

  for (const child of root) {
    const locName = localizationDict[child.ID]?.i18n.en ?? child.ID;
    const locDesc =
      localizationDict[child.DescriptionLocID]?.i18n.en ??
      child.DescriptionLocID;
    const examinations: SymptomSchema['examinations'] =
      child.Examinations.ExaminationRef.map(
        (ref) => proceduresDict.examinations[ref]
      );
    const treatment: SymptomSchema['treatment'] = child.Treatments
      ? proceduresDict.treatments[child.Treatments.TreatmentRef]
      : undefined;
    const collapseSym: SymptomSchema['collapse_sym'] =
      child.CollapseProcedureRef
        ? {
            id: child.CollapseProcedureRef,
            name: localizationDict[child.CollapseProcedureRef].i18n.en,
            start_hours: child.RiskOfCollapseStartHours,
            end_hours: child.RiskOfCollapseEndHours,
          }
        : undefined;

    const newSymptom: SymptomSchema = {
      name: locName,
      description: locDesc,
      icon_index: child.IconIndex + 1,
      examinations,
      treatment,
      discomfort: child.DiscomfortLevel,
      hazard: child.Hazard,
      mobility: child.PatientMobility,
      main_sym: child.IsMainSymptom,
      collapse_sym: collapseSym,
    };

    symptoms[child.ID] ??= newSymptom;
  }
}
