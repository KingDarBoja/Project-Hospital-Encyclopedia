import { HttpClient } from '@angular/common/http';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { SymptomSchema } from '@ph-encyclopedia/shared/symptoms';
import { map } from 'rxjs/operators';

@Component({
    templateUrl: 'symptom-list.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class SymptomListComponent {
  readonly symptom$ = this.http
    .get<Record<string, SymptomSchema>>('assets/symptoms/symptoms.json')
    .pipe(
      map((res) =>
        Object.values(res || {}).sort((a, b) => a.name.localeCompare(b.name))
      )
      // tap((res) => {
      //   console.log("🚀 ~ SymptomListComponent ~ tap ~ Symptoms:", res)
      //   const emptyExams = res.filter(x => x.examinations.some(y => !y));
      //   console.log("🚀 ~ SymptomListComponent ~ tap ~ emptyExams:", emptyExams)
      // })
    );

  constructor(private readonly http: HttpClient) {}
}
