import { Component, Input } from '@angular/core';
import { ProcedureSchema } from '@ph-encyclopedia/shared/procedures';

@Component({
  selector: 'ph-encyclopedia-procedure-card',
  templateUrl: 'procedure-card.component.html'
})

export class ProcedureCardComponent {
  @Input() procedure!: ProcedureSchema;
}
