import { generateDiagnoses } from './app/diagnoses/generateDiagnoses';
import { generateSymptoms } from './app/symptoms/generateSymptoms';

function main() {
  console.log('---- Initialize Scraper ----');

  generateSymptoms();
  // generateDiagnoses();

  console.log('---- Finished Scraper ----');
}

main();
