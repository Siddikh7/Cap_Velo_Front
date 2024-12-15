import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, Validators} from '@angular/forms';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-logger',
  templateUrl: './Logger.component.html',
  standalone: true,
  imports: [
    RouterLink,
    FormsModule
  ],
  styleUrls: ['./Logger.component.css']
})
export class LoggerComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.loginForm.valid) {
      console.log('Form Submitted', this.loginForm.value);
    }
  }
}
