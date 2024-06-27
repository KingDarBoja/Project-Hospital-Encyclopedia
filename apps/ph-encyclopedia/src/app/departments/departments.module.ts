import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';
import { DepartmentPageModule } from './ui/department-page/department-page.module';
import { DepartmentPageComponent } from './ui/department-page/department-page.component';

const DepartmentRoutes: Routes = [
  {
    path: 'emergency',
    component: DepartmentPageComponent,
    pathMatch: 'full',
    data: { dptCode: OfficialDepartments.EMERGENCY },
  },
  {
    path: 'general_surgery',
    component: DepartmentPageComponent,
    pathMatch: 'full',
    data: { dptCode: OfficialDepartments.INTERNAL_MEDICINE },
  },
  {
    path: 'internal_medicine',
    component: DepartmentPageComponent,
    pathMatch: 'full',
    data: { dptCode: OfficialDepartments.INTERNAL_MEDICINE },
  },
  {
    path: 'orthopedics',
    component: DepartmentPageComponent,
    pathMatch: 'full',
    data: { dptCode: OfficialDepartments.ORTHOPEDY },
  },
  {
    path: 'cardiology',
    component: DepartmentPageComponent,
    pathMatch: 'full',
    data: { dptCode: OfficialDepartments.CARDIOLOGY },
  },
  {
    path: 'neurology',
    component: DepartmentPageComponent,
    pathMatch: 'full',
    data: { dptCode: OfficialDepartments.NEUROLOGY },
  },
  {
    path: 'traumatology',
    component: DepartmentPageComponent,
    pathMatch: 'full',
    data: { dptCode: OfficialDepartments.TRAUMATOLOGY },
  },
  {
    path: 'infectious_diseases',
    component: DepartmentPageComponent,
    pathMatch: 'full',
    data: { dptCode: OfficialDepartments.INFECTIOUS_DISEASES },
  },
  /* --- Modded Departments Routes --- */
  {
    path: 'oncology',
    component: DepartmentPageComponent,
    pathMatch: 'full',
    data: { dptCode: OfficialDepartments.ONCOLOGY },
  },
];

@NgModule({
  imports: [DepartmentPageModule, RouterModule.forChild(DepartmentRoutes)],
  exports: [RouterModule],
})
export class DepartmentsModule {}
