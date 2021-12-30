import { Component, Input } from '@angular/core';
import { SymptomSchema } from '@ph-encyclopedia/shared/symptoms';

@Component({
  selector: 'ph-encyclopedia-symptom-card',
  templateUrl: 'symptom-card.component.html'
})

export class SymptomCardComponent {
  @Input() symptom!: SymptomSchema;
}
