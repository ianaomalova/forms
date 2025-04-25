import {Component, OnInit} from '@angular/core';
import {NgClass, NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-auth',
  imports: [
    NgSwitch,
    NgSwitchCase,
    NgTemplateOutlet,
    FormsModule,
    ReactiveFormsModule,
    NgClass
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
  animations: [
    trigger('formSwitch', [
      transition('login => register', [
        style({ position: 'relative', height: '100%' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(-100px)' })),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ]),
      transition('register => login', [
        style({ position: 'relative', height: '100%' }),
        animate('300ms ease-out', style({ opacity: 0, transform: 'translateX(100px)' })),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})

export class AuthComponent implements OnInit {
  mode: 'login' | 'register' = 'login';

  loginForm!: FormGroup;
  registerForm!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.initForms();
  }

  initForms(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })

    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validator: this.passwordMatchValidator
    })
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return (password && confirmPassword && password !== confirmPassword) ? {passwordMismatch: true} : null;
  }

  get passwordMatch() {
    return this.registerForm.hasError('passwordMismatch');
  }

  toggleMode(event: Event, mode: 'login' | 'register') {
    event.preventDefault();
    this.mode = mode;
  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    console.log(this.loginForm);
  }

  onSubmitRegister() {
    console.log(this.registerForm);
  }
}
