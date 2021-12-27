import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'ph-encyclopedia-examination-list',
  templateUrl: 'examination.component.html',
})
export class ExaminationComponent {
  readonly vm$ = this.http.get('assets/procedures/examinations.json').pipe(
    map((res) => Object.values(res || {})),
    tap((res) => console.log(res))
  );

  constructor(private readonly http: HttpClient) {}
}
