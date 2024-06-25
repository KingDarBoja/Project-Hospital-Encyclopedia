import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyMenuModule as MatMenuModule } from '@angular/material/legacy-menu';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';

import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: 'examinations',
    loadChildren: () =>
      import('./procedures/examination/examination.module').then(
        (m) => m.ExaminationModule
      ),
  },
  {
    path: 'treatments',
    loadChildren: () =>
      import('./procedures/treatment/treatment.module').then(
        (m) => m.TreatmentModule
      ),
  },
  {
    path: 'dpt',
    loadChildren: () =>
      import('./departments/departments.module').then(
        (m) => m.DepartmentsModule
      ),
  },
  {
    path: 'symptoms',
    loadChildren: () =>
      import('./symptoms/symptom-list/symptom-list.module').then(
        (m) => m.SymptomListModule
      ),
  },
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
