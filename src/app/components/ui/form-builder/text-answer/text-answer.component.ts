import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormElementType} from '../../../../models/formElement.interface';
import {NgClass} from '@angular/common';
import {animate, state, style, transition, trigger} from '@angular/animations';


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
  @Output() copyRequested = new EventEmitter<string>();

  form!: FormGroup;

  showCopyMenu = false;
  copyMenuPosition = { top: '0', left: '0' };

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

  onDelete() {
    this.deleteRequested.emit();
  }

  onCopy(position: string) {
    this.copyRequested.emit(position);
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
    this.showCopyMenu = true;
    this.copyMenuPosition = {
      top: `${event.clientY - 10}px`,
      left: `${event.clientX - 10}px`
    }

    event.stopPropagation();
  }

  closeCopyMenu() {
    this.showCopyMenu = false;
  }

  copyElement(position: 'above'|'below'| 'bottom' ) {
    this.closeCopyMenu();
    this.copyRequested.emit(position);
  }

  checked: boolean = false;
  protected readonly FormElementType = FormElementType;

  isChoiceType() {
    return this.typeAnswer === FormElementType.SINGLE_CHOICE || this.typeAnswer === FormElementType.MULTI_CHOICE;
  }
}
