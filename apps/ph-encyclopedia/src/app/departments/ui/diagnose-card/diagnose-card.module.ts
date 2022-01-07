import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

import { DiagnoseCardComponent } from './diagnose-card.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule],
  exports: [DiagnoseCardComponent],
  declarations: [DiagnoseCardComponent],
})
export class DiagnoseCardModule {}
