import * as chalk from 'chalk';
// import { generateDiagnoses } from './app/diagnoses/generateDiagnoses';
// import { generateSymptoms } from './app/symptoms/generateSymptoms';
import { generateLocalization } from "./app/localization/generateLocatization";
import { generateProcedures } from "./app/procedures/generateProcedures";

async function main() {
  console.log(chalk.bgRed('---- Starting Project Hospital Scraper ----'));

  const localizationDict = await generateLocalization();
  await generateProcedures(localizationDict);
  // generateSymptoms();
  // generateDiagnoses();

  console.log(chalk.bgRed('---- Finished Project Hospital Scraper ----'));
}

main();
