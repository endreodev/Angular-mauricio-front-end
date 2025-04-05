import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseError } from '../model/response-error';
import { AuthService } from '../services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = this.fb.group({
      login: ['', [Validators.required]],
      senha: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {
          console.log('Login successful', response);
        },
        (error: ResponseError) => {
          Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Please check your credentials and try again.',
          });
        }
      );
    }
  }
}
