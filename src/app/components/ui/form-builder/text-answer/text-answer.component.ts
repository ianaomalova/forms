import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {FormElementType} from '../../../../models/formElement.interface';
import {NgClass, NgStyle} from '@angular/common';

@Component({
  selector: 'app-text-answer',
  imports: [
    ToggleSwitch,
    FormsModule,
    ReactiveFormsModule,
    NgStyle,
    NgClass
  ],
  templateUrl: './text-answer.component.html',
  styleUrl: './text-answer.component.scss'
})
export class TextAnswerComponent implements OnInit {
  @Input() typeAnswer: FormElementType = FormElementType.SINGLE_TEXT;
  @Output() dragStarted = new EventEmitter<DragEvent>();
  @Output() deleteRequested = new EventEmitter<void>();

  form!: FormGroup;

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

  checked: boolean = false;
  protected readonly FormElementType = FormElementType;

  isChoiceType() {
    return this.typeAnswer === FormElementType.SINGLE_CHOICE || this.typeAnswer === FormElementType.MULTI_CHOICE;
  }
}
