import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { SymptomCardComponent } from './symptom-card.component';
import { ImageFallbackDirective } from '../../utils/fallback-image.directive';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
    ImageFallbackDirective,
  ],
  exports: [SymptomCardComponent],
  declarations: [SymptomCardComponent],
})
export class SymptomCardModule {}
