import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SymptomListComponent } from './symptom-list.component';
import { SymptomCardModule } from '../symptom-card/symptom-card.module';

@NgModule({
  imports: [
    CommonModule,
    SymptomCardModule,
    RouterModule.forChild([
      {
        path: '',
        component: SymptomListComponent,
        pathMatch: 'full',
      },
    ]),
  ],
  exports: [RouterModule],
  declarations: [SymptomListComponent],
})
export class SymptomListModule {}
