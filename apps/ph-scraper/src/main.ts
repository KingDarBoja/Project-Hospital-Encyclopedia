import * as chalk from 'chalk';
import { generateAuxiliary } from './app/generateAuxiliary';
// import { generateDiagnoses } from './app/diagnoses/generateDiagnoses';
// import { generateSymptoms } from './app/symptoms/generateSymptoms';
import { generateLocalization } from "./app/localization/generateLocatization";
import { generateProcedures } from "./app/procedures/generateProcedures";

async function main() {
  console.log(chalk.bgRed('---- Starting Project Hospital Scraper ----'));

  // 1. Obtain all the english text as dictionary.
  const localizationDict = await generateLocalization();

  // 2. Obtain skill and room types description to be used by procedures.
  const auxDict = await generateAuxiliary(localizationDict);

  // 3. Obtain all procedues (examination and treatments).
  await generateProcedures(localizationDict, auxDict);

  // 4.
  // generateSymptoms();

  // 5.
  // generateDiagnoses();

  console.log(chalk.bgRed('---- Finished Project Hospital Scraper ----'));
}

main();
