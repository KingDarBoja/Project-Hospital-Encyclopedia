import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

@Component({
  template: `
    <h2>Emergency Yay</h2>
  `,
})
export class EmergencyDptComponent {
  readonly emergencyDiagnoses$ = this.http
    .get('assets/diagnoses/emergency.json')
    .pipe(
      map((res) =>
        Object.values(res || {}).sort((a, b) => a.name.localeCompare(b.name))
      ),
      tap((res) => console.log(res))
    );

  constructor(private readonly http: HttpClient) {}
}
