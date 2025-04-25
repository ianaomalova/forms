import {Component, OnInit} from '@angular/core';
import {NgClass, NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import { PrimeIcons, MenuItem } from 'primeng/api';
import {TextAnswerComponent} from '../../ui/form-builder/text-answer/text-answer.component';

interface Items {
  name: string;
  icon: string;
}

@Component({
  selector: 'app-create-form',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    NgClass,
    TextAnswerComponent
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent implements OnInit {
  mode: 'constructor' | 'settings' = 'constructor';

  items!: MenuItem[];

  ngOnInit() {
    this.items = [
      {
        label: 'Однострочный ответ',
        icon: PrimeIcons.PEN_TO_SQUARE
      },
      {
        label: 'Многострочный ответ',
        icon: PrimeIcons.ALIGN_LEFT
      },
      {
        label: 'Список одиночного выбора',
        icon: PrimeIcons.CHEVRON_CIRCLE_DOWN
      },
      {
        label: 'Список множественного выбора',
        icon: PrimeIcons.PLUS
      }
    ]
  }

  toggle(mode: 'constructor' | 'settings') {
    this.mode = mode;
  }
}
