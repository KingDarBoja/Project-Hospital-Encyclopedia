import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmergencyDptComponent } from './emergency.component';

const DepartmentRoutes: Routes = [
  {
    path: 'emergency',
    component: EmergencyDptComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(DepartmentRoutes)],
  exports: [RouterModule],
  declarations: [EmergencyDptComponent],
})
export class DepartmentsModule {}
