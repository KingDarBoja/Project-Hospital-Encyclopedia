import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';

import { ExaminationComponent } from './examination.component';

@NgModule({
  imports: [CommonModule, MatCardModule, MatListModule, MatGridListModule],
  exports: [ExaminationComponent],
  declarations: [ExaminationComponent],
})
export class ExaminationModule {}
