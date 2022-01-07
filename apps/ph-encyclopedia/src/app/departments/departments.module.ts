import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepartmentPageModule } from './ui/department-page/department-page.module';
import { EmergencyDptComponent } from './emergency.component';
import { GeneralSurgeryDptComponent } from './general_surgery.component';
import { InternalMedicineDptComponent } from './internal_medicine.component';
import { OrthopedicsDptComponent } from './orthopedics.component';
import { CardiologyDptComponent } from './cardiology.component';
import { NeurologyDptComponent } from './neurology.component';
import { TraumatologyDptComponent } from './traumatology.component';
import { InfectiousDiseasesDptComponent } from './infectious_diseases.component';

const DepartmentRoutes: Routes = [
  {
    path: 'emergency',
    component: EmergencyDptComponent,
    pathMatch: 'full',
  },
  {
    path: 'general_surgery',
    component: GeneralSurgeryDptComponent,
    pathMatch: 'full',
  },
  {
    path: 'internal_medicine',
    component: InternalMedicineDptComponent,
    pathMatch: 'full',
  },
  {
    path: 'orthopedics',
    component: OrthopedicsDptComponent,
    pathMatch: 'full',
  },
  {
    path: 'cardiology',
    component: CardiologyDptComponent,
    pathMatch: 'full',
  },
  {
    path: 'neurology',
    component: NeurologyDptComponent,
    pathMatch: 'full',
  },
  {
    path: 'traumatology',
    component: TraumatologyDptComponent,
    pathMatch: 'full',
  },
  {
    path: 'infectious_diseases',
    component: InfectiousDiseasesDptComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [DepartmentPageModule, RouterModule.forChild(DepartmentRoutes)],
  exports: [RouterModule],
  declarations: [
    EmergencyDptComponent,
    GeneralSurgeryDptComponent,
    InternalMedicineDptComponent,
    OrthopedicsDptComponent,
    CardiologyDptComponent,
    NeurologyDptComponent,
    TraumatologyDptComponent,
    InfectiousDiseasesDptComponent,
  ],
})
export class DepartmentsModule {}
