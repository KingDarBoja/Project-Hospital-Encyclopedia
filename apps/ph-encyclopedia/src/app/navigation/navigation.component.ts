import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDividerModule } from '@angular/material/divider';

type NavigationSection = Array<{
  route: string;
  icon: string;
  name: string;
  divider?: boolean;
  colorFilter?: 'treatment' | 'examination' | 'symptom';
  children?: Array<{
    route: string;
    icon: string;
    name: string;
    divider?: boolean;
  }>;
}>;

@Component({
  selector: 'ph-encyclopedia-app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
})
export class NavigationComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  sections: NavigationSection = [
    {
      route: '',
      icon: 'ph_icon_42',
      name: 'Departments',
      divider: true,
      children: [
        {
          route: '/dpt/emergency',
          icon: 'ph_icon_390',
          name: 'Emergency',
        },
        {
          route: '/dpt/general_surgery',
          icon: 'ph_icon_404',
          name: 'General Surgery',
        },
        {
          route: '/dpt/internal_medicine',
          icon: 'ph_icon_411',
          name: 'Internal Medicine',
        },
        {
          route: '/dpt/orthopedics',
          icon: 'ph_icon_418',
          name: 'Orthopedics',
        },
        {
          route: '/dpt/cardiology',
          icon: 'ph_icon_425',
          name: 'Cardiology',
        },
        {
          route: '/dpt/neurology',
          icon: 'ph_icon_432',
          name: 'Neurology',
        },
        {
          route: '/dpt/traumatology',
          icon: 'ph_icon_474',
          name: 'Traumatology',
        },
        {
          route: '/dpt/infectious_diseases',
          icon: 'ph_icon_467',
          name: 'Infectious Diseases',
          divider: true,
        },
      ]
    },
    {
      route: '/modded_dpt',
      icon: 'ph_icon_97',
      name: 'Modded Dpts.',
      divider: true,
      children: [
        {
          route: '/modded_dpt/oncology',
          icon: 'Mod_ONCO/mod_dept_icon_1',
          name: 'Oncology',
        },
        {
          route: '/modded_dpt/ent',
          icon: 'ph_icon_97',
          name: 'Ear, Nose and Throat',
        },
        {
          route: '/modded_dpt/plastics',
          icon: 'ph_icon_97',
          name: 'Plastic Surgery',
        },
        {
          route: '/modded_dpt/urology',
          icon: 'ph_icon_97',
          name: 'Urology and Nephrology',
          divider: true,
        },
      ],
    },
    {
      route: '/symptoms',
      icon: 'ph_icon_106',
      name: 'Symptoms',
      divider: true,
      colorFilter: 'symptom',
    },
    {
      route: '/examinations',
      icon: 'ph_icon_140',
      name: 'Examinations',
      divider: true,
      colorFilter: 'examination',
    },
    {
      route: '/treatments',
      icon: 'ph_icon_367',
      name: 'Treatments',
      divider: true,
      colorFilter: 'treatment',
    },
    {
      route: '/misc',
      icon: 'ph_icon_519',
      divider: true,
      name: 'Miscelaneous',
    },
    {
      route: '/faq',
      icon: 'ph_icon_319',
      name: 'FAQ',
      divider: true,
    },
  ];
}
