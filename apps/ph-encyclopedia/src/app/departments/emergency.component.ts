import { Component } from '@angular/core';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  selector: 'ph-encyclopedia-emergency-dpt',
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.EMERGENCY"
    ></ph-encyclopedia-department-page>
  `,
})
export class EmergencyDptComponent {
  readonly dptCodes = OfficialDepartments;
}
