import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthService} from "../../services/Authentification.service";
import {CommonModule} from "@angular/common";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";

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
      name: [''],
      surname: [''],
      username: [''],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (this.form.valid) {
      if (this.isLoginMode) {
        this.authService.login(this.form.value).subscribe({
          next: () => this.router.navigate(['/']),
          error: (err: any) => alert(err.message)
        });
      } else {
        this.authService.register(this.form.value).subscribe({
          next: () => this.toggleMode(),
          error: (err: any) => alert(err.message)
        });
      }
    }
  }
  // onSubmit(){
  //   if(this.form.valid){
  //     if(this.isLoginMode){
  //       this.veloS
  //     }
  //   }
  // }
}
