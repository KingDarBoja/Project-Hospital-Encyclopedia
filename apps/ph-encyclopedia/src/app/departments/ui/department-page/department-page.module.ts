import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DiagnoseCardModule } from '../diagnose-card/diagnose-card.module';

import { DepartmentPageComponent } from './department-page.component';

@NgModule({
  imports: [CommonModule, DiagnoseCardModule],
  exports: [DepartmentPageComponent],
  declarations: [DepartmentPageComponent],
})
export class DepartmentPageModule {}
