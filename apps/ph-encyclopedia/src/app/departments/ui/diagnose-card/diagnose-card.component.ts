import { Component, Input } from '@angular/core';

@Component({
  selector: 'ph-encyclopedia-diagnose-card',
  templateUrl: 'diagnose-card.component.html'
})

export class DiagnoseCardComponent {
  @Input() diagnose!: any;
}
