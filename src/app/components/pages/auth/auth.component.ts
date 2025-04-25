import {Component} from '@angular/core';
import {NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';


@Component({
  selector: 'app-auth',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  animations: [
    trigger('formSwitch', [
      transition('login => register', [
        style({ position: 'relative', height: '100%' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-100px)' })),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition('register => login', [
        style({ position: 'relative', height: '100%' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(100px)' })),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})

export class AuthComponent {
  mode: 'login' | 'register' = 'login';

  toggleMode(event: Event, mode: 'login' | 'register') {
    event.preventDefault();
    this.mode = mode;
  }
}
