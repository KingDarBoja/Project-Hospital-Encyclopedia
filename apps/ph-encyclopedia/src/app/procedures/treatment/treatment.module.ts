import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TreatmentComponent } from './treatment.component';
import { ProcedureCardModule } from '../procedure-card/procedure-card.module';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ProcedureCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: TreatmentComponent,
        pathMatch: 'full',
      },
    ]),
  ],
  exports: [TreatmentComponent],
  declarations: [TreatmentComponent],
})
export class TreatmentModule {}
