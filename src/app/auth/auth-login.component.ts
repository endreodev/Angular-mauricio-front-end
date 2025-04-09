import { Component } from '@angular/core';
import { MaterialModule } from '../shared/material/material.module';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResponseError } from '../model/response-error';
import { AuthService } from '../services/auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './auth-login.component.html',
  styleUrl: './auth-login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  isLoading = false; 

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: MatSnackBar,
    private router: Router // Inject Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.authService.login(this.loginForm.value).subscribe(
        (response: any) => {

          if (response && response.token) {
            localStorage.setItem('access_token', response.token['acaccess_token']);
          }
          
          this.isLoading = false;
          this.snackBar.open('Login realizado com sucesso!', 'Fechar', {
            duration: 1000,
          });
          
          this.router.navigate(['/dashboard']);

        },
        (error: any) => {
          this.isLoading = false;
          this.snackBar.open('Falha no login: ' + error.message, 'Fechar', {
            duration: 3000,
          });
        }
      );
    }
  }
}
