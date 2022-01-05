import { Component, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, EMPTY, map, switchMap, tap } from 'rxjs';
import { OfficialDepartments } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  selector: 'ph-encyclopedia-department-page',
  templateUrl: 'department-page.component.html',
})
export class DepartmentPageComponent {
  @Input() set dptCode(val: OfficialDepartments) {
    this._diagnose$.next(val);
  }

  private readonly _diagnose$ = new BehaviorSubject<OfficialDepartments | null>(
    null
  );
  readonly diagnose$ = this._diagnose$.asObservable().pipe(
    switchMap((dptCode) =>
      dptCode
        ? this.http.get(`assets/diagnoses/diagnoses_${dptCode}.json`).pipe(
            map((res) =>
              Object.values(res || {}).sort((a, b) =>
                a.name.localeCompare(b.name)
              )
            ),
            tap((res) => console.log(res))
          )
        : EMPTY
    )
  );

  constructor(private readonly http: HttpClient) {}
}
