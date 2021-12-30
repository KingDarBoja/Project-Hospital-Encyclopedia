import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

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
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
