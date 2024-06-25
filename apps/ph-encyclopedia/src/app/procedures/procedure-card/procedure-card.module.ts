import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';

import { ProcedureCardComponent } from './procedure-card.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule, MatGridListModule],
  exports: [ProcedureCardComponent],
  declarations: [ProcedureCardComponent],
})
export class ProcedureCardModule {}
