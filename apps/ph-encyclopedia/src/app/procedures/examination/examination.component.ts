import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProcedureSchema } from '@ph-encyclopedia/shared/procedures';

@Component({
  selector: 'ph-encyclopedia-examination-list',
  templateUrl: 'examination.component.html',
})
export class ExaminationComponent {
  readonly examination$ = this.http
    .get<Record<string, ProcedureSchema>>('assets/procedures/examinations.json')
    .pipe(
      map((res) =>
        Object.values(res || {}).sort((a, b) => a.name.localeCompare(b.name))
      ),
      // tap((res) => console.log(res))
    );

  constructor(private readonly http: HttpClient) {}
}
