import { Component } from '@angular/core';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  selector: 'ph-encyclopedia-internal-medicine-dpt',
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.INTERNAL_MEDICINE"
    ></ph-encyclopedia-department-page>
  `,
})
export class InternalMedicineDptComponent {
  readonly dptCodes = OfficialDepartments;
}
