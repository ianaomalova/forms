import {Component, OnInit} from '@angular/core';
import {NgClass, NgStyle, NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import {PrimeIcons} from 'primeng/api';
import {TextAnswerComponent} from '../../ui/form-builder/text-answer/text-answer.component';
import {FormElementData, FormElementType} from '../../../models/formElement.interface';
import {DRUG_ITEMS} from '../../../models/drugItems';

@Component({
  selector: 'app-create-form',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    NgClass,
    TextAnswerComponent,
    NgStyle,
  ],
  templateUrl: './create-form.component.html',
  styleUrl: './create-form.component.scss'
})
export class CreateFormComponent implements OnInit {
  mode: 'constructor' | 'settings' = 'constructor';

  draggedItem: FormElementData | null = null;
  isDragOver = false;
  drugItems: FormElementData[] = DRUG_ITEMS; // Элементы левого списка
  formElements: FormElementData[] = []; // Элементы правого списка

  activeDropZone: number | null = null;

  ngOnInit() {
  }

  toggle(mode: 'constructor' | 'settings') {
    this.mode = mode;
  }

  onDragStart($event: DragEvent, item: FormElementData) {
    this.draggedItem = item;
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

    const newElement: FormElementData = {
      ...this.draggedItem,
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
}
