import { Component } from '@angular/core';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  selector: 'ph-encyclopedia-orthopedics-dpt',
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.ORTHOPEDY"
    ></ph-encyclopedia-department-page>
  `,
})
export class OrthopedicsDptComponent {
  readonly dptCodes = OfficialDepartments;
}
