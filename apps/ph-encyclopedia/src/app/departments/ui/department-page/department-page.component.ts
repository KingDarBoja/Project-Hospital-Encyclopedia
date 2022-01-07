import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, map, switchMap, tap } from 'rxjs';
import {
  DiagnoseSchema,
  OfficialDepartments,
} from '@ph-encyclopedia/shared/diagnoses';

@Component({
  selector: 'ph-encyclopedia-department-page',
  templateUrl: 'department-page.component.html',
})
export class DepartmentPageComponent {
  @Input() set dptCode(val: OfficialDepartments) {
    this._vm$.next(val);
  }

  readonly dptTitles: Record<OfficialDepartments, string> = {
    er: 'Emergency',
    surg: 'General Surgery',
    intern: 'Internal Medicine',
    ortho: 'Orthopedy',
    cardio: 'Cardiology',
    neuro: 'Neurology',
    trauma: 'Traumatology',
    infect: 'Infectious Diseases',
  };
  private readonly _vm$ = new BehaviorSubject<OfficialDepartments | null>(
    null
  );
  readonly vm$ = this._vm$.asObservable().pipe(
    switchMap((dptCode) =>
      dptCode
        ? this.http
            .get<Record<string, DiagnoseSchema>>(
              `assets/diagnoses/diagnoses_${dptCode}.json`
            )
            .pipe(
              map((res) => ({
                dptCode,
                diagnoses: Object.values<DiagnoseSchema>(res).sort((a, b) =>
                  a.name.localeCompare(b.name)
                ),
              })),
              tap((res) => console.log(res))
            )
        : EMPTY
    )
  );

  constructor(private readonly http: HttpClient) {}
}
