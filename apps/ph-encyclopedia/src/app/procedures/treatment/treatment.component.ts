import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ProcedureSchema } from '@ph-encyclopedia/shared/procedures';

@Component({
    selector: 'ph-encyclopedia-treatment-list',
    templateUrl: 'treatment.component.html',
    standalone: false
})
export class TreatmentComponent {
  readonly treatment$ = this.http
    .get<Record<string, ProcedureSchema>>('assets/procedures/treatments.json')
    .pipe(
      map((res) =>
        Object.values(res || {}).sort((a, b) => a.name.localeCompare(b.name))
      ),
      // tap((res) => console.log(res))
    );

  constructor(private readonly http: HttpClient) {}
}
