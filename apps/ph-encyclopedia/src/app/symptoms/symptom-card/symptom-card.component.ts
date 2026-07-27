import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { SymptomSchema } from '@ph-encyclopedia/shared/symptoms';

@Component({
    selector: 'ph-encyclopedia-symptom-card',
    templateUrl: 'symptom-card.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})

export class SymptomCardComponent {
  @Input() symptom!: SymptomSchema;
}
