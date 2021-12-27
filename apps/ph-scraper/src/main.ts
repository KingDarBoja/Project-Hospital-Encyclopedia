// import { generateDiagnoses } from './app/diagnoses/generateDiagnoses';
// import { generateSymptoms } from './app/symptoms/generateSymptoms';
import { generateProcedures } from "./app/procedures/generateProcedures";

async function main() {
  console.log('---- Initialize Scraper ----');

  await generateProcedures();
  // generateSymptoms();
  // generateDiagnoses();

  console.log('---- Finished Scraper ----');
}

main();
