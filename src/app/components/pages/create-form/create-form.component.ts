import {Component, OnInit} from '@angular/core';
import {NgClass, NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import {TextAnswerComponent} from '../../ui/form-builder/text-answer/text-answer.component';
import {FormElementData, FormElementType} from '../../../models/formElement.interface';
import {DRAG_ITEMS} from '../../../models/drugItems';
import {animate, style, transition, trigger} from '@angular/animations';

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
  styleUrl: './create-form.component.scss',
  animations: [
    trigger('fadeOut', [
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0, transform: 'scale(0.95)' }))
      ])
    ])
  ]
})
export class CreateFormComponent implements OnInit {
  mode: 'constructor' | 'settings' = 'constructor';

  draggedItem: FormElementData | null = null;
  isDragOver = false;
  dragItems: FormElementData[] = DRAG_ITEMS; // Элементы левого списка
  formElements: FormElementData[] = []; // Элементы правого списка
  draggedFromForm = false;

  activeDropZone: number | null = null;

  ngOnInit() {
  }

  toggle(mode: 'constructor' | 'settings') {
    this.mode = mode;
  }

  onDragStart($event: DragEvent, item: FormElementData) {
    this.draggedItem = item;
    console.log(this.draggedItem);
    $event.dataTransfer!.setData('text/plain', ''); // Для Firefox
    $event.dataTransfer!.effectAllowed = 'copy';
  }

  onDragOver($event: DragEvent, index: number) {
    $event.preventDefault();
    this.isDragOver = true;
    $event.dataTransfer!.dropEffect = 'copy';
    this.activeDropZone = index;
  }

  onDrop($event: DragEvent, index: number) {
    $event.preventDefault();

    if (!this.draggedItem) {
      return;
    }

    console.log(this.draggedItem);
    const newElement: FormElementData = {
      ...this.draggedItem,
      question: '',
      required: false,
      options: [],
      id: Date.now(),
    }

    this.formElements.splice(index, 0, newElement);

    this.draggedItem = null;
    this.isDragOver = false;
    this.activeDropZone = null;
  }

  onDragLeave($event: DragEvent) {
    $event.preventDefault();
    this.isDragOver = false;
    this.activeDropZone = null;
  }

  onChildDragStart($event: any, element: FormElementData) {
    this.draggedItem = element;
    this.draggedFromForm = true;
    $event.dataTransfer!.setData('text/plain', '');
    $event.dataTransfer!.effectAllowed = 'move';
  }

  removeFormElement(index: number) {
    this.formElements.splice(index, 1);
  }

  protected readonly FormElementType = FormElementType;

  copyFormElement($event: any, i: number) {
    console.log($event.value);
    const newElement = {
      question: $event.value.question,
      type: $event.type,
      options: $event.value.options,
      icon: $event.icon,
      label: $event.label,
      id: $event.id,
    }

    if ($event.position === 'above') {
      this.formElements.splice(i, 0, newElement);
    } else if ($event.position === 'below') {
      this.formElements.splice(i + 1, 0, newElement);
    } else {
      this.formElements.push(newElement);
    }
  }
}
