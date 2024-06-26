import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as fse from 'fs-extra';
import { LocalizationSchema } from '@ph-encyclopedia/shared/localization';
import {
  ProcedureSchema,
  ProcedureDatabaseSchema,
  ProcedureDatabase,
  Procedures,
} from '@ph-encyclopedia/shared/procedures';
import { Auxiliary } from './generateAuxiliary';
import { BASE_PATH } from './common';

const BASE_PROCEDURES_DIR = 'procedures';

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

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  isArray: (name) => {
    if (alwaysArray.indexOf(name) !== -1) return true;
  },
});

// Create examination and treatment dictionaries, where each key is the `ID` from the parsed examination xml.
const procedures: Procedures = {
  examinations: {},
  treatments: {},
};

export async function generateProcedures(
  localizationDict: Record<string, LocalizationSchema>,
  auxDict: Auxiliary
): Promise<Procedures> {
  const inputPath = path.resolve(BASE_PATH, 'input', BASE_PROCEDURES_DIR);
  const outputPath = path.resolve(BASE_PATH, 'output', BASE_PROCEDURES_DIR);

  // Get all the xml files inside the `input/procedures` directory and loop each
  // to obtain a parsed json for further processing.
  const procedureFilePaths = await fs.readdir(inputPath, { recursive: true });
  for (const procedureFilePath of procedureFilePaths) {
    const filePath = path.join(inputPath, procedureFilePath);
    const stat = fse.statSync(filePath);

    // Make sure we are not reading a directory.
    if (stat.isFile()) {
      await populateProceduresDictionary(filePath, localizationDict, auxDict);
    }
  }

  await fse.outputFile(
    path.resolve(outputPath, 'examinations.json'),
    JSON.stringify(procedures.examinations, null, 2)
  );

  await fse.outputFile(
    path.resolve(outputPath, 'treatments.json'),
    JSON.stringify(procedures.treatments, null, 2)
  );

  return procedures;
}

async function populateProceduresDictionary(
  filePath: string,
  localizationDict: Record<string, LocalizationSchema>,
  auxDict: Auxiliary
) {
  const rawDoc = await fse.readFile(filePath);

  // Parse the file content.
  const parsedDoc = parser.parse(rawDoc) as ProcedureDatabaseSchema;

  // Check if it is an examination or a treatment.
  let root:
    | ProcedureDatabase['GameDBExamination']
    | ProcedureDatabase['GameDBTreatment'] = [];
  if (parsedDoc.Database.GameDBExamination) {
    root = parsedDoc.Database.GameDBExamination;
  } else if (parsedDoc.Database.GameDBTreatment) {
    root = parsedDoc.Database.GameDBTreatment;
  }

  for (const child of root) {
    const docProcArray =
      child.Procedure.RequiredDoctorQualificationList?.SkillRef || [];
    const requiredDoctors: ProcedureSchema['required_doctors'] =
      docProcArray.map((skill) => {
        const auxSkillEntry = auxDict.skills[skill];
        const locSkillName =
          localizationDict[auxSkillEntry.name]?.i18n.en ?? auxSkillEntry.name;
        const locSkillDesc =
          localizationDict[auxSkillEntry.description]?.i18n.en ??
          auxSkillEntry.description;
        return {
          name: locSkillName,
          description: locSkillDesc,
          icon_index: auxSkillEntry.icon_index + 1,
        };
      });

    let requiredLabSpecialist: ProcedureSchema['required_lab_spec'] = undefined;
    if (child.Procedure.RequiredStatLabQualificationRef) {
      const specSkillEntry =
        auxDict.skills[child.Procedure.RequiredStatLabQualificationRef];
      const locSkillName =
        localizationDict[specSkillEntry.name]?.i18n.en ?? specSkillEntry.name;
      const locSkillDesc =
        localizationDict[specSkillEntry.description]?.i18n.en ??
        specSkillEntry.description;
      requiredLabSpecialist = {
        name: locSkillName,
        description: locSkillDesc,
        icon_index: specSkillEntry.icon_index + 1,
      };
    }

    const locName = localizationDict[child.ID]?.i18n.en ?? child.ID;
    const locDesc =
      localizationDict[child.AbbreviationLocID]?.i18n.en ??
      child.AbbreviationLocID;

    // Create the new entry and assign to the corresponding dictionary.
    const newProcedureEntry: ProcedureSchema = {
      id: child.ID,
      name: locName,
      description: locDesc,
      required_doctors: requiredDoctors,
      required_lab_spec: requiredLabSpecialist,
      // Icons were generated with start index of 1 whereas the game uses a
      // zero-index based grid.
      icon_index: child.IconIndex + 1,
      discomfort:
        child.DiscomfortLevel.length > 1
          ? child.DiscomfortLevel[child.DiscomfortLevel.length - 1]
          : child.DiscomfortLevel[0],
    };

    if (parsedDoc.Database.GameDBExamination) {
      procedures.examinations[child.ID] ??= newProcedureEntry;
    } else if (parsedDoc.Database.GameDBTreatment) {
      procedures.treatments[child.ID] ??= newProcedureEntry;
    }
  }
}
