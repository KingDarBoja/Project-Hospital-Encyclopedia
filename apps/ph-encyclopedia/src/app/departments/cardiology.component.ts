import { Component } from '@angular/core';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.CARDIOLOGY"
    ></ph-encyclopedia-department-page>
  `,
})
export class CardiologyDptComponent {
  readonly dptCodes = OfficialDepartments;
}
