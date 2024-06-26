import { Component } from '@angular/core';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  selector: 'ph-encyclopedia-infectious-diseases-dpt',
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.INFECTIOUS_DISEASES"
    ></ph-encyclopedia-department-page>
  `,
})
export class InfectiousDiseasesDptComponent {
  readonly dptCodes = OfficialDepartments;
}
