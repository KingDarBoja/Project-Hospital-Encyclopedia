import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as fse from 'fs-extra';

const BASE_PATH = path.resolve('apps', 'ph-scraper', 'src', 'app');
const BASE_PROCEDURES_DIR = 'procedures';

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
      populateProceduresDictionary(filePath);
    }
  }

  // await fse.outputFile(path.resolve(outputPath, 'text.json'), '{}');

  // console.log(procedureFiles);
}

async function populateProceduresDictionary(filePath: string) {
  const rawDoc = await fse.readFile(filePath);

  // Initialize xml parser and pass the file content.
  const parser = new XMLParser();
  const parsedDoc = parser.parse(rawDoc);

  // Pretty-printing for debugging.
  const prettyStr = JSON.stringify(parsedDoc, null, 2);

  console.group(`******** File path: ${filePath} ********`);
  console.log(prettyStr);
  console.groupEnd();
}
