import * as chalk from 'chalk';
import { generateAuxiliary } from './app/generateAuxiliary';
import { generateDiagnoses } from './app/diagnoses/generateDiagnoses';
import { generateLocalization } from "./app/localization/generateLocatization";
import { generateProcedures } from "./app/procedures/generateProcedures";
import { generateSymptoms } from './app/symptoms/generateSymptoms';

async function main() {
  console.log(chalk.bgRed('---- Starting Project Hospital Scraper ----'));

  // 1. Obtain all the english text as dictionary.
  console.log(chalk.green('1. Started processing of localization'));
  const localizationDict = await generateLocalization();
  console.log(chalk.green('1. Finished processing of localization'));

  // 2. Obtain skill and room types description to be used by procedures.
  console.log(chalk.green('2. Started processing of auxiliary'));
  const auxDict = await generateAuxiliary(localizationDict);
  console.log(chalk.green('2. Finished processing of auxiliary'));

  // 3. Obtain all procedues (examination and treatments).
  console.log(chalk.green('3. Started processing of procedures'));
  const procedures = await generateProcedures(localizationDict, auxDict);
  console.log(chalk.green('3. Finished processing of procedures'));

  // 4. Obtain all symptoms (including DLCs ones).
  console.log(chalk.green('4. Started processing of symptoms'));
  const symptoms = await generateSymptoms(localizationDict, procedures);
  console.log(chalk.green('4. Finished processing of symptoms'));

  // 5. Obtain all diagnoses (using the generated symptoms).
  console.log(chalk.green('5. Started processing of symptoms'));
  await generateDiagnoses(localizationDict, symptoms);
  console.log(chalk.green('5. Finished processing of symptoms'));

  console.log(chalk.bgRed('---- Finished Project Hospital Scraper ----'));
}

main();
