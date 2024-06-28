import { Component, Input } from '@angular/core';
import { ProcedureSchema } from '@ph-encyclopedia/shared/procedures';

@Component({
  selector: 'ph-encyclopedia-procedure-card',
  templateUrl: 'procedure-card.component.html',
})
export class ProcedureCardComponent {
  @Input() set procedure(val: ProcedureSchema) {
    const [desc, req_rooms] = val.description.split('\\n\\n');
    this._formattedProcedure = { raw: val, desc, req_rooms };
  }

  get formattedProcedure() {
    return this._formattedProcedure;
  }

  @Input() type!: 'EXM' | 'TRT';

  private _formattedProcedure!: { raw: ProcedureSchema; desc: string; req_rooms: string; };
}
