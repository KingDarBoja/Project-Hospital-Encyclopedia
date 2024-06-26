import { Component } from '@angular/core';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  selector: 'ph-encyclopedia-neurology-dpt',
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.NEUROLOGY"
    ></ph-encyclopedia-department-page>
  `,
})
export class NeurologyDptComponent {
  readonly dptCodes = OfficialDepartments;
}
