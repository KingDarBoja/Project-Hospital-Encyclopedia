
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
    imports: [MatListModule, MatIconModule],
    selector: 'ph-encyclopedia-landing-page',
    changeDetection: ChangeDetectionStrategy.Eager,
    templateUrl: 'landing.component.html'
})
export class LandingPageComponent {}
