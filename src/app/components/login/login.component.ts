import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/Authentification.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

/**
 * Composant pour gérer l'authentification des utilisateurs.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule]
})
export class LoginComponent {
  form: FormGroup;
  isLoginMode = true;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  /**
   * Change le mode entre connexion et inscription.
   */
  switchMode() {
    this.isLoginMode = !this.isLoginMode;
    if (!this.isLoginMode) {
      this.form.addControl('nom', this.fb.control('', Validators.required));
      this.form.addControl('prenom', this.fb.control('', Validators.required));
      this.form.addControl('username', this.fb.control('', Validators.required));
    } else {
      this.form.removeControl('nom');
      this.form.removeControl('prenom');
      this.form.removeControl('username');
    }
  }

  /**
   * Soumet le formulaire de connexion ou d'inscription.
   */
  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log("Form Data:", formData);

      if (this.isLoginMode) {
        console.log("Login Data", formData);
        this.authService.login(formData).subscribe({
          next: () => {
            console.log("Login successful");
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.error("Login error:", err);
            alert(err.message);
          }
        });
      } else {
        this.authService.register(formData).subscribe({
          next: () => {
            console.log("Registration successful");
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.error("Registration error:", err);
            alert(err.message);
          }
        });
      }
    } else {
      console.warn("Form is invalid");
      console.log("Form Errors:", this.form.errors);
      Object.keys(this.form.controls).forEach(key => {
        const controlErrors = this.form.get(key)?.errors;
        if (controlErrors) {
          console.log(`Key: ${key}, Errors:`, controlErrors);
        }
      });
    }
  }
}
