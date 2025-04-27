import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormElementData, FormElementType} from '../../../../models/formElement.interface';
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
  @Input() element!: FormElementData;
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
      question: [this.element.question, Validators.required],
      options: this.formBuilder.array([]),
      required: [this.element.required],
    })

    if (this.element.options!.length > 0) {
      this.initOptions();
    } else {
      this.addOption();
    }
  }

  deleteElement() {
    this.deleteRequested.emit();
  }

  get options(): FormArray {
    return this.form.get('options') as FormArray;
  }

  initOptions() {
    const optionsArray = this.form.get('options') as FormArray;
    this.element.options!.forEach((option) => {
      optionsArray.push(this.formBuilder.control(option, Validators.required));
    })
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
      icon: this.element.icon,
      label: this.element.label,
      type: this.element.type
    };
    this.copyRequested.emit(element);
  }

  isChoiceType() {
    return (this.element.type === FormElementType.SINGLE_CHOICE ||
      this.element.type === FormElementType.MULTI_CHOICE);
  }
}
