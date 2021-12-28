import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

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
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
