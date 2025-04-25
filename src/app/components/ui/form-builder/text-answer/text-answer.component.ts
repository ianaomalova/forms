import {Component, Input} from '@angular/core';
import {ToggleSwitch} from 'primeng/toggleswitch';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-text-answer',
  imports: [
    ToggleSwitch,
    FormsModule
  ],
  templateUrl: './text-answer.component.html',
  styleUrl: './text-answer.component.scss'
})
export class TextAnswerComponent {
  @Input() typeAnswer: 'single' | 'multi' = 'single';

  checked: boolean = false;
}
