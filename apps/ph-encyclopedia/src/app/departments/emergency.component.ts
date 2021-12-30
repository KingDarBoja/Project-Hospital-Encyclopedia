import { Component } from '@angular/core';
import { Departments } from './ui/department-page/department-page.component';

@Component({
  template: `
    <ph-encyclopedia-department-page
      [dptCode]="dptCodes.EMERGENCY"
    ></ph-encyclopedia-department-page>
  `,
})
export class EmergencyDptComponent {
  readonly dptCodes = Departments;
}
