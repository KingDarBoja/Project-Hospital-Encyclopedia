import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { SymptomSchema } from '@ph-encyclopedia/shared/symptoms';
import { map, tap } from 'rxjs/operators';

@Component({
  templateUrl: 'symptom-list.component.html',
})
export class SymptomListComponent {
  readonly symptom$ = this.http
    .get<Record<string, SymptomSchema>>('assets/symptoms/symptoms.json')
    .pipe(
      map((res) =>
        Object.values(res || {}).sort((a, b) => a.name.localeCompare(b.name))
      ),
      tap((res) => console.log(res))
    );

  constructor(private readonly http: HttpClient) {}
}
