import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DepartmentPageComponent } from './department-page.component';

@NgModule({
  imports: [CommonModule],
  exports: [DepartmentPageComponent],
  declarations: [DepartmentPageComponent],
})
export class DepartmentPageModule { }
