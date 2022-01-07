import { Component, Input } from '@angular/core';
import { DiagnoseSchema } from '@ph-encyclopedia/shared/diagnoses';

@Component({
  selector: 'ph-encyclopedia-diagnose-card',
  templateUrl: 'diagnose-card.component.html'
})

export class DiagnoseCardComponent {
  @Input() diagnose!: DiagnoseSchema;

  readonly occurenceI18N: Record<DiagnoseSchema['occurrence'], string> = {
    OCCURRENCE_COMMON: 'Common',
    OCCURRENCE_RARE: 'Rare',
    OCCURRENCE_UNCOMMON: 'Uncommon'
  };
  readonly occurenceColour: Record<DiagnoseSchema['occurrence'], string> = {
    OCCURRENCE_COMMON: 'text-yellow-500',
    OCCURRENCE_RARE: 'text-orange-500',
    OCCURRENCE_UNCOMMON: 'text-red-500'
  };
}
