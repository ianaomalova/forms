import { Component } from '@angular/core';
import {HeaderComponent} from '../../ui/header/header.component';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [
    HeaderComponent,
    RouterOutlet
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
