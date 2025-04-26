import {Component, OnInit} from '@angular/core';
import {NgClass, NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import {PrimeIcons} from 'primeng/api';
import {TextAnswerComponent} from '../../ui/form-builder/text-answer/text-answer.component';
import {FormElementData, FormElementType} from '../../../models/formElement.interface';

@Component({
  selector: 'app-create-form',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    NgClass,
    TextAnswerComponent,
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent implements OnInit {
  mode: 'constructor' | 'settings' = 'constructor';

  draggedItem: FormElementData | null = null;
  isDragOver = false;
  drugItems: FormElementData[] = []; // Элементы левого списка

  formElements: FormElementData[] = []; // Элементы правого списка


  ngOnInit() {
    this.initItems();
  }

  initItems() {
    this.drugItems = [
      {
        id: 1,
        label: 'Однострочный ответ',
        icon: PrimeIcons.PEN_TO_SQUARE,
        type: FormElementType.SINGLE_TEXT,
      },
      {
        id: 2,
        label: 'Многострочный ответ',
        icon: PrimeIcons.ALIGN_LEFT,
        type: FormElementType.SINGLE_TEXT,
      },
      {
        id: 3,
        label: 'Список одиночного выбора',
        icon: PrimeIcons.CHEVRON_CIRCLE_DOWN,
        type: FormElementType.SINGLE_TEXT,
      },
      {
        id: 4,
        label: 'Список множественного выбора',
        icon: PrimeIcons.PLUS,
        type: FormElementType.SINGLE_TEXT,
      }
    ]
  }


  toggle(mode: 'constructor' | 'settings') {
    this.mode = mode;
  }

  onDragStart($event: DragEvent, item: FormElementData) {
    this.draggedItem = item;
    $event.dataTransfer!.setData('text/plain', ''); // Для Firefox
    $event.dataTransfer!.effectAllowed = 'copy';
  }

  onDragOver($event: DragEvent) {
    $event.preventDefault();
    this.isDragOver = true;
    $event.dataTransfer!.dropEffect = 'copy';
  }

  onDrop($event: DragEvent) {
    $event.preventDefault();
    this.isDragOver = false;

    if (this.draggedItem) {
      const newElement = {
        ...this.draggedItem,
        id: Date.now() // Уникальный ID
      };

      this.formElements = [...this.formElements, newElement];
      this.draggedItem = null;
    }
  }

  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.isDragOver = false;
  }
}
