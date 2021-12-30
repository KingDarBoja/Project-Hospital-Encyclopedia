import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmergencyDptComponent } from './emergency.component';
import { DepartmentPageModule } from './ui/department-page/department-page.module';

const DepartmentRoutes: Routes = [
  {
    path: 'emergency',
    component: EmergencyDptComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [DepartmentPageModule, RouterModule.forChild(DepartmentRoutes)],
  exports: [RouterModule],
  declarations: [EmergencyDptComponent],
})
export class DepartmentsModule {}
