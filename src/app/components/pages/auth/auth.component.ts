import {Component, OnInit} from '@angular/core';
import {NgClass, NgSwitch, NgSwitchCase, NgTemplateOutlet} from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../../auth/auth.service';
import {Router} from '@angular/router';


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

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

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
    this.loginForm.reset()
    this.registerForm.reset();
  }

  onSubmitLogin() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const {email, password} = this.loginForm.value;

    this.authService.login(email, password).subscribe({
      next: (res) => {
        console.log('Успешный вход', res);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Ошибка входа:', error.message);
      }
    })
  }

  onSubmitRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const {firstName, lastName, email, password} = this.registerForm.value;

    this.authService.registerUser(email, password, firstName, lastName).subscribe({
      next: (res) => {
        console.log('Успешная регистрация', res);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.log(error);
        this.handleAuthError(error);
      }
    })
  }

  private handleAuthError(error: any) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        alert('Этот email уже используется');
        break;
      case 'auth/invalid-email':
        alert('Неверный формат email');
        break;
      case 'auth/weak-password':
        alert('Пароль должен содержать минимум 6 символов');
        break;
      default:
        alert('Неизвестная ошибка: ' + error.message);
    }
  }
}
