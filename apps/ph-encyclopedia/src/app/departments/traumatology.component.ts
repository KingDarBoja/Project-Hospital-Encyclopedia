import { Component } from '@angular/core';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.TRAUMATOLOGY"
    ></ph-encyclopedia-department-page>
  `,
})
export class TraumatologyDptComponent {
  readonly dptCodes = OfficialDepartments;
}
