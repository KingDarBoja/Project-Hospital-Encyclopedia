import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

import { DiagnoseCardComponent } from './diagnose-card.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule],
  exports: [DiagnoseCardComponent],
  declarations: [DiagnoseCardComponent],
})
export class DiagnoseCardModule {}
