import { generateDiagnoses } from './app/diagnoses/generateDiagnoses';

function main() {
  console.log('---- Initialize Scraper ----');

  generateDiagnoses();

  console.log('---- Finished Scraper ----');
}

main();
