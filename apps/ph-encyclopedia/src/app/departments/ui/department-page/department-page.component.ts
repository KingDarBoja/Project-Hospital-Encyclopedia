import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EMPTY, map, switchMap } from 'rxjs';
import {
  DiagnoseSchema,
  OfficialDepartments,
  OfficialDepartmentsType,
} from '@ph-encyclopedia/shared/diagnoses';
import { ActivatedRoute } from '@angular/router';

const DepartmentTitles: Record<OfficialDepartments, string> = {
  er: 'Emergency',
  surg: 'General Surgery',
  intern: 'Internal Medicine',
  ortho: 'Orthopedy',
  cardio: 'Cardiology',
  neuro: 'Neurology',
  trauma: 'Traumatology',
  infect: 'Infectious Diseases',
  onco: 'Oncology',
  ent: 'Otorhinolaryngology',
};

@Component({
    selector: 'ph-encyclopedia-department-page',
    templateUrl: 'department-page.component.html',
    standalone: false
})
export class DepartmentPageComponent {
  private http = inject(HttpClient);
  private activatedRoute = inject(ActivatedRoute);

  readonly dptTitles = DepartmentTitles;
  dptCode = this.activatedRoute.data.pipe(
    map((data) => data['dptCode'] as OfficialDepartmentsType)
  );
  diagnoses$ = this.dptCode.pipe(
    switchMap((dptCode) => (dptCode ? this.fetchDiagnoses(dptCode) : EMPTY))
  );

  private httpEndpoint(dptCode: OfficialDepartmentsType) {
    return this.http.get<Record<string, DiagnoseSchema>>(
      `assets/diagnoses/diagnoses_${dptCode}.json`
    );
  }

  private fetchDiagnoses(dptCode: OfficialDepartmentsType) {
    return this.httpEndpoint(dptCode).pipe(
      map((res) => ({
        dptCode,
        diagnoses: Object.values(res).sort((a, b) =>
          a.name.localeCompare(b.name)
        ),
      }))
      // tap((res) => console.log(res))
    );
  }
}
