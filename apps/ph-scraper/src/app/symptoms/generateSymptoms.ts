import { XMLParser } from 'fast-xml-parser';
import * as path from 'path';
import { promises as fs } from "fs";

const BASE_SYMPTOMS_DIR = 'symptoms';

const parser = new XMLParser();

export async function generateSymptoms() {
  const fileName = 'Symptoms.xml';
  const fullFilePath = path.resolve(__dirname, 'assets', BASE_SYMPTOMS_DIR, fileName);
  console.log('Reading Path ', fullFilePath);


  const xmlSymptom = await fs.readFile(fullFilePath);
  const parsedSymptom = parser.parse(xmlSymptom);

  // As example
  // const firstMedicalCondition = parsedDiagnose.Database.GameDBMedicalCondition[0];
  const prettyStr = JSON.stringify(parsedSymptom, null, 2);

  console.log(prettyStr);
}
