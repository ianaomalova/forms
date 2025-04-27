import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormElementType} from '../../../../models/formElement.interface';
import {NgClass} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PrimeIcons} from 'primeng/api';


@Component({
  selector: 'app-text-answer',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './text-answer.component.html',
  styleUrl: './text-answer.component.scss',
  animations: [
    trigger('menuAnimation', [
      state('hidden', style({
        opacity: 0,
        transform: 'scale(0.9)'
      })),
      state('visible', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('hidden => visible', [
        animate('350ms ease-out')
      ]),
      transition('visible => hidden', [
        animate('350ms ease-in')
      ]),
    ]),
  ]
})
export class TextAnswerComponent implements OnInit {
  @Input() typeAnswer: FormElementType = FormElementType.SINGLE_TEXT;
  @Output() dragStarted = new EventEmitter<DragEvent>();
  @Output() deleteRequested = new EventEmitter<void>();
  @Output() copyRequested = new EventEmitter<any>();

  private closeMenuTimeout: any;
  protected readonly FormElementType = FormElementType;

  form!: FormGroup;

  showCopyMenu = false;

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      question: ['', Validators.required],
      options: this.formBuilder.array([]),
      required: [false],
    })

    this.addOption();
  }

  deleteElement() {
    this.deleteRequested.emit();
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  addOption() {
    this.options.push(this.formBuilder.control('', Validators.required))
  }

  removeOption(index: number) {
    this.options.removeAt(index);
  }

  onDrugStarted(event: DragEvent) {
    this.dragStarted.emit(event);
  }

  openCopyMenu(event: MouseEvent) {
    setTimeout(() => {
      this.showCopyMenu = true;
    }, 0);

    event.stopPropagation();
  }

  closeCopyMenu() {
    this.closeMenuTimeout = setTimeout(() => {
      this.showCopyMenu = false;
    }, 300);
  }

  onMenuEnter() {
    clearTimeout(this.closeMenuTimeout);
  }

  copyElement(position: 'above'|'below'| 'bottom' ) {
    clearTimeout(this.closeMenuTimeout);
    this.closeCopyMenu();
    const element = {
      id: Date.now(),
      value: this.form.value,
      position,
      icon: this.icon,
      label: this.label
    };
    this.copyRequested.emit(element);
  }

  isChoiceType() {
    return this.typeAnswer === FormElementType.SINGLE_CHOICE || this.typeAnswer === FormElementType.MULTI_CHOICE;
  }

  get icon() {
    if (this.typeAnswer === FormElementType.SINGLE_TEXT) {
      return PrimeIcons.PEN_TO_SQUARE;
    } else if (this.typeAnswer === FormElementType.MULTI_TEXT) {
      return PrimeIcons.ALIGN_LEFT;
    } else if (this.typeAnswer === FormElementType.SINGLE_CHOICE) {
      return PrimeIcons.CHEVRON_CIRCLE_DOWN;
    } else {
      return PrimeIcons.PLUS_CIRCLE;
    }
  }

  get label() {
    if (this.typeAnswer === FormElementType.SINGLE_TEXT) {
      return 'Однострочный ответ';
    } else if (this.typeAnswer === FormElementType.MULTI_TEXT) {
      return 'Многострочный ответ';
    } else if (this.typeAnswer === FormElementType.SINGLE_CHOICE) {
      return 'Список одиночного выбора';
    } else {
      return 'Список множественного выбора';
    }
  }
}
