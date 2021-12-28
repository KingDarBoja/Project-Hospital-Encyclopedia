// import { generateDiagnoses } from './app/diagnoses/generateDiagnoses';
// import { generateSymptoms } from './app/symptoms/generateSymptoms';
import { generateLocalization } from "./app/localization/generateLocatization";
import { generateProcedures } from "./app/procedures/generateProcedures";

async function main() {
  console.log('---- Initialize Scraper ----');

  const localizationDict = await generateLocalization();
  await generateProcedures(localizationDict);
  // generateSymptoms();
  // generateDiagnoses();

  console.log('---- Finished Scraper ----');
}

main();
