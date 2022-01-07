import { Component } from '@angular/core';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.NEUROLOGY"
    ></ph-encyclopedia-department-page>
  `,
})
export class NeurologyDptComponent {
  readonly dptCodes = OfficialDepartments;
}
