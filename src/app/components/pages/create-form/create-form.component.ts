import {Component, OnInit} from '@angular/core';
import {NgClass, NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import {MenuItem, PrimeIcons} from 'primeng/api';
import {TextAnswerComponent} from '../../ui/form-builder/text-answer/text-answer.component';
import {DrugItem, FormElementData, FormElementType} from '../../../models/formElement.interface';
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-create-form',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    NgClass,
    TextAnswerComponent,
    CdkDropList,
    DragDropModule
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent implements OnInit {
  mode: 'constructor' | 'settings' = 'constructor';

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

  onDrop(event: CdkDragDrop<FormElementData[]>) {
    const draggedItem = event.item.data as FormElementData;

    const newElement: FormElementData = {
      id: Date.now(),
      label: draggedItem.label,
      type: draggedItem.type,
    };

    this.formElements.push(newElement);
  }
}
