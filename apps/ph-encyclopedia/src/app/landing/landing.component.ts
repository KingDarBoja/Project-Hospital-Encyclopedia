import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule],
  selector: 'ph-encyclopedia-landing-page',
  templateUrl: 'landing.component.html',
})
export class LandingPageComponent {}
