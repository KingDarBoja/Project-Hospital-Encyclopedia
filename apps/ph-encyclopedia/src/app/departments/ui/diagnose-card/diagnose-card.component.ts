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
    OCCURRENCE_UNCOMMON: 'Uncommon',
    OCCURRENCE_RARE: 'Rare',
    OCCURRENCE_SL_COMMON: 'Common',
    OCCURRENCE_SL_UNCOMMON: 'Uncommon',
    OCCURRENCE_SL_UNLIKELY: 'Unlikely',
    OCCURRENCE_SL_RARE: 'Rare',
    OCCURRENCE_SL_PRETTYRARE: 'Pretty Rare',
    OCCURRENCE_SL_VERYRARE: 'Very Rare',
    OCCURRENCE_SL_ULTRARARE: 'Ultra Rare',
    OCCURRENCE_SL_UNIQUE: 'Unique',
    OCCURRENCE_SL_ULTRAUNIQUE: 'Ultra Unique'
  };

  readonly occurenceColour: Record<DiagnoseSchema['occurrence'], string> = {
    OCCURRENCE_COMMON: 'text-green-500',
    OCCURRENCE_UNCOMMON: 'text-emerald-500',
    OCCURRENCE_RARE: 'text-blue-500',
    OCCURRENCE_SL_COMMON: 'text-green-500',
    OCCURRENCE_SL_UNCOMMON: 'text-emerald-500',
    OCCURRENCE_SL_UNLIKELY: 'text-emerald-800',
    OCCURRENCE_SL_RARE: 'text-blue-500',
    OCCURRENCE_SL_PRETTYRARE: 'text-blue-800',
    OCCURRENCE_SL_VERYRARE: 'text-violet-500',
    OCCURRENCE_SL_ULTRARARE: 'text-violet-800',
    OCCURRENCE_SL_UNIQUE: 'text-fuchsia-500',
    OCCURRENCE_SL_ULTRAUNIQUE: 'text-fuchsia-800'
  };
}
