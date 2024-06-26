import { Component } from '@angular/core';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  selector: 'ph-encyclopedia-general-surgery-dpt',
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.GENERAL_SURGERY"
    ></ph-encyclopedia-department-page>
  `,
})
export class GeneralSurgeryDptComponent {
  readonly dptCodes = OfficialDepartments;
}
