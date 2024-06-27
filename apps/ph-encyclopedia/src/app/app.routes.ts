import { Route } from '@angular/router';
import { NavigationComponent } from './navigation/navigation.component';
import { LandingPageComponent } from './landing/landing.component';

export const appRoutes: Route[] = [
  {
    path: '',
    component: NavigationComponent,
    children: [
      {
        path: '',
        component: LandingPageComponent,
      },
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
        path: 'modded_dpt',
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
    ],
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '' },
];
