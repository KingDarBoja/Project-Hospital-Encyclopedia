import { XMLParser } from 'fast-xml-parser';
import path = require('path');
import { promises as fs } from "fs";
import { DiagnoseDatabaseSchema } from './types';

const BASE_DIAGNOSES_DIR = 'diagnoses';
// const BASE_PATH = process.cwd();

const parser = new XMLParser();

export async function generateDiagnoses() {
  const fileName = 'DiagnosesER.xml';
  const fullFilePath = path.resolve(__dirname, 'assets', BASE_DIAGNOSES_DIR, fileName);
  console.log('Reading Path ', fullFilePath);


  const xmlDiagnose = await fs.readFile(fullFilePath);
  const parsedDiagnose = parser.parse(xmlDiagnose) as DiagnoseDatabaseSchema;

  // As example
  const firstMedicalCondition = parsedDiagnose.Database.GameDBMedicalCondition[0];
  const prettyStr = JSON.stringify(firstMedicalCondition, null, 2);

  console.log(prettyStr);
}
