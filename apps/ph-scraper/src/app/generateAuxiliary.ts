import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as fse from 'fs-extra';

import { LocalizationSchema } from '@ph-encyclopedia/shared/localization';
import {
  RoomTypeSchema,
  RoomTypesDatabaseSchema,
  SkillSchema,
  SkillsDatabaseSchema,
} from '@ph-encyclopedia/shared/auxiliary';
import { BASE_PATH } from './common';

export type Auxiliary = {
  skills: Record<string, SkillSchema>;
  roomTypes: Record<string, RoomTypeSchema>;
};

const alwaysArray = ['GameDBSkill'];

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  isArray: (name) => {
    if (alwaysArray.indexOf(name) !== -1) return true;
  },
});

// Create auxiliary dictionaries (Skills, RoomTypes), where each key is the `ID` from the parsed xml.
const auxiliary: Auxiliary = {
  skills: {},
  roomTypes: {},
};

export async function generateAuxiliary(
  localizationDict: Record<string, LocalizationSchema>
): Promise<Auxiliary> {
  const specDirname = 'auxiliary';
  const inputPath = path.resolve(BASE_PATH, 'input', specDirname);
  const outputPath = path.resolve(BASE_PATH, 'output', specDirname);

  // Get all the xml files inside the `input` directory and loop each to obtain
  // a parsed json for futher processing.
  const procedureFilePaths = await fs.readdir(inputPath, { recursive: true });
  for (const procedureFilePath of procedureFilePaths) {
    const filePath = path.join(inputPath, procedureFilePath);
    const stat = fse.statSync(filePath);

    // Make sure we are not reading a directory.
    if (stat.isFile()) {
      if (procedureFilePath.includes('Skills')) {
        await populateSkillDictionary(filePath, localizationDict);
      }

      if (procedureFilePath.includes('RoomTypes')) {
        await populateRoomTypesDictionary(filePath, localizationDict);
      }
    }
  }

  await fse.outputFile(
    path.resolve(outputPath, 'skills.json'),
    JSON.stringify(auxiliary.skills)
  );

  await fse.outputFile(
    path.resolve(outputPath, 'room_types.json'),
    JSON.stringify(auxiliary.roomTypes)
  );

  return auxiliary;
}

async function populateSkillDictionary(
  filePath: string,
  localizationDict: Record<string, LocalizationSchema>
) {
  const rawDoc = await fse.readFile(filePath);

  // Parse the file content.
  const parsedDoc = parser.parse(rawDoc) as SkillsDatabaseSchema;
  const root = parsedDoc.Database.GameDBSkill;

  for (const child of root) {
    const locNameEntry = localizationDict[child.ID]
      ? localizationDict[child.ID].i18n.en
      : child.ID;
    const locDescEntry = localizationDict[child.AbbreviationLocID]
      ? localizationDict[child.AbbreviationLocID].i18n.en
      : child.AbbreviationLocID;

    auxiliary.skills[child.ID] ??= {
      id: child.ID,
      description_loc_id: child.AbbreviationLocID,
      name: locNameEntry,
      description: locDescEntry,
      icon_index: child.IconIndex + 1,
      type: 'BASE',
    };
  }
}

async function populateRoomTypesDictionary(
  filePath: string,
  localizationDict: Record<string, LocalizationSchema>
) {
  const rawDoc = await fse.readFile(filePath);

  // Parse the file content.
  const parsedDoc = parser.parse(rawDoc) as RoomTypesDatabaseSchema;
  const root = parsedDoc.Database.GameDBRoomType;

  for (const child of root) {
    const locNameEntry = localizationDict[child.ID]
      ? localizationDict[child.ID].i18n.en
      : child.ID;
    const locDescEntry = localizationDict[child.AbbreviationLocID]
      ? localizationDict[child.AbbreviationLocID].i18n.en
      : child.AbbreviationLocID;

    const requiredEquip = Array.isArray(
      child.RequiredEquipment?.GameDBRequiredEquipment
    )
      ? child.RequiredEquipment.GameDBRequiredEquipment.map((x) => x.Tag)
      : [];

    const officeTags = Array.isArray(child.Tags?.Tag) ? child.Tags.Tag : [];

    auxiliary.roomTypes[child.ID] ??= {
      id: child.ID,
      description_loc_id: child.AbbreviationLocID,
      name: locNameEntry,
      description: locDescEntry,
      icon_index: child.IconIndex + 1,
      equipment_tags: requiredEquip,
      office_tags: officeTags,
      worker: child.RequiredSkill || undefined,
      size: { width: child.MinWidth, height: child.MinHeight },
    };
  }
}
