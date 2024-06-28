import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';

import { DiagnoseCardComponent } from './diagnose-card.component';
import { ImageFallbackDirective } from '../../../utils/fallback-image.directive';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    ImageFallbackDirective,
  ],
  exports: [DiagnoseCardComponent],
  declarations: [DiagnoseCardComponent],
})
export class DiagnoseCardModule {}
