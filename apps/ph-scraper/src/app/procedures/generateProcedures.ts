import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as fse from 'fs-extra';
import { ProcedureDatabaseSchema } from './input-types';
import { ProcedureSchema } from './output-types';

const BASE_PATH = path.resolve('apps', 'ph-scraper', 'src', 'app');
const BASE_PROCEDURES_DIR = 'procedures';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  isArray: (name, jpath, isLeafNode, isAttribute) => {
    if (alwaysArray.indexOf(name) !== -1) return true;
  },
});

/** Create an examination dictionary, where each key is the `ID` from the parsed
 * examination xml. */
const examinationDict: Record<string, ProcedureSchema> = {};

// const final = [];
const alwaysArray = [
  'GameDBExamination',
  'DiscomfortLevel',
  'SkillRef',
  'RequiredEquipmentList',
  'RequiredEquipment',
  'RequiredRoomTags',
  'Tag',
  'AnimationSetupLying',
  'AllowedWithAnyHospitalization',
  'Complication',
  'AnimationNameIdle',
];

export async function generateProcedures() {
  const inputPath = path.resolve(BASE_PATH, 'input', BASE_PROCEDURES_DIR);
  const outputPath = path.resolve(BASE_PATH, 'output', BASE_PROCEDURES_DIR);

  // Get all the xml files inside the `input/procedures` directory and loop each
  // to obtain a parsed json for futher processing.
  const procedureFilePaths = await fse.readdir(inputPath);
  for (const procedureFilePath of procedureFilePaths) {
    const filePath = path.join(inputPath, procedureFilePath);
    const stat = fse.statSync(filePath);

    // Make sure we are not reading a directory.
    if (stat.isFile()) {
      await populateProceduresDictionary(filePath);
    }
  }

  await fse.outputFile(
    path.resolve(outputPath, 'examinations.json'),
    JSON.stringify(examinationDict)
  );

  // console.log(procedureFiles);
}

async function populateProceduresDictionary(filePath: string) {
  const rawDoc = await fse.readFile(filePath);

  // Parse the file content.
  const parsedDoc = parser.parse(rawDoc) as ProcedureDatabaseSchema;

  // Check if it is an examination or a treatment.
  if (parsedDoc.Database.GameDBExamination) {
    console.log('Examination!');
    const rootExaminations = parsedDoc.Database.GameDBExamination;

    /** TODO: Need to obtain the localization strings for each field. */
    for (const examination of rootExaminations) {
      const requiredDoctors =
        examination.Procedure.RequiredDoctorQualificationList?.SkillRef.map(
          (skill) => ({ name: skill, description: skill })
        ) ?? [];

      examinationDict[examination.ID] ??= {
        name: examination.ID,
        description: examination.AbbreviationLocID,
        required_doctors: requiredDoctors,
        // Icons were generated with start index of 1 whereas the game uses a
        // zero-index based grid.
        icon_index: examination.IconIndex + 1,
        discomfort:
          examination.DiscomfortLevel.length > 1
            ? examination.DiscomfortLevel[
                examination.DiscomfortLevel.length - 1
              ]
            : examination.DiscomfortLevel[0],
      };
    }
  } else if (parsedDoc.Database.GameDBTreatment) {
    console.log('Treatment!');
  }

  // final.push(parsedDoc);

  // Pretty-printing for debugging.
  // const prettyStr = JSON.stringify(parsedDoc, null, 2);

  console.log(`******** File path: ${filePath} ********`);
  // console.log(prettyStr);
  // console.groupEnd();
}
