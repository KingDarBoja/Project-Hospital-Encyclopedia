import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

import { SymptomCardComponent } from './symptom-card.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule, MatGridListModule],
  exports: [SymptomCardComponent],
  declarations: [SymptomCardComponent],
})
export class SymptomCardModule {}
