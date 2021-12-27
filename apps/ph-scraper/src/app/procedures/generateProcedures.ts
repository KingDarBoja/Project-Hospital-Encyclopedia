import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import * as fse from 'fs-extra';

const BASE_PATH = path.resolve('apps', 'ph-scraper', 'src', 'app');
const BASE_PROCEDURES_DIR = 'procedures';

export async function generateProcedures() {
  const inputPath = path.resolve(BASE_PATH, 'input', BASE_PROCEDURES_DIR);
  const outputPath = path.resolve(BASE_PATH, 'output', BASE_PROCEDURES_DIR);

  const procedureFiles = await fse.readdir(inputPath);

  await fse.outputFile(path.resolve(outputPath, 'text.json'), '{}');

  console.log(procedureFiles);
}
