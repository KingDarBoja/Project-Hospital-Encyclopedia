import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ExaminationComponent } from './examination.component';
import { ProcedureCardModule } from '../procedure-card/procedure-card.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ProcedureCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: ExaminationComponent,
        pathMatch: 'full',
      },
    ]),
  ],
  exports: [ExaminationComponent],
  declarations: [ExaminationComponent],
})
export class ExaminationModule {}
