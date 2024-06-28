import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

import { ProcedureCardComponent } from './procedure-card.component';
import { ImageFallbackDirective } from '../../utils/fallback-image.directive';

@NgModule({
  imports: [
    CommonModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    ImageFallbackDirective,
  ],
  exports: [ProcedureCardComponent],
  declarations: [ProcedureCardComponent],
})
export class ProcedureCardModule {}
