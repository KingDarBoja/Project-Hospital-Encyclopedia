import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as fse from 'fs-extra';
import * as chalk from 'chalk';
import {
  LocalizationDatabaseSchema,
  LocalizationSchema,
} from '@ph-encyclopedia/shared/localization';

const BASE_PATH = path.resolve('apps', 'ph-scraper', 'src', 'app');
const BASE_LOC_DIR = 'localization';

const parser = new XMLParser({
  // ignoreAttributes: false,
  // attributeNamePrefix: '',
});

/** Create an localization dictionary, where each key is the `LocID` from the parsed
 * localization xml. */
const localizationDict: Record<string, LocalizationSchema> = {};

export async function generateLocalization() {
  console.log(chalk.yellow('1. Started processing of localization'));

  const inputPath = path.resolve(BASE_PATH, 'input', BASE_LOC_DIR);
  const outputPath = path.resolve(BASE_PATH, 'output', BASE_LOC_DIR);

  // Get all the xml files inside the `input/localization` directory and loop each
  // to obtain a parsed json for futher processing.
  const filePaths = await fse.readdir(inputPath);
  for (const filePath of filePaths) {
    const fullFilePath = path.join(inputPath, filePath);
    const stat = fse.statSync(fullFilePath);

    // Make sure we are not reading a directory.
    if (stat.isFile()) {
      await populateLocalizationDictionary(fullFilePath);
    }
  }

  await fse.outputFile(
    path.resolve(outputPath, 'localization.json'),
    JSON.stringify(localizationDict)
  );

  console.log(chalk.yellow('1. Finished processing of localization'));

  return localizationDict;
}

async function populateLocalizationDictionary(filePath: string) {
  const rawDoc = await fse.readFile(filePath);

  // Parse the file content.
  const parsedDoc = parser.parse(rawDoc) as LocalizationDatabaseSchema;
  const root = parsedDoc.Database.GameDBStringTable;

  for (const loc of root.LocalizedStrings.GameDBLocalizedString) {
    localizationDict[loc.LocID] ??= {
      id: loc.LocID,
      i18n: {
        [root.LanguageCode]: loc.Text,
      },
    };
  }

  // Pretty-printing for debugging.
  // const prettyStr = JSON.stringify(parsedDoc, null, 2);

  // console.log(`******** File path: ${filePath} ********`);
  // console.log(prettyStr);
  // console.groupEnd();
}