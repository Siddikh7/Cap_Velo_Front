import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { VeloService } from '../../services/velo.service';
import { CommonModule } from '@angular/common';
import { VeloModel } from '../../models/velo.model';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule
  ],
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private router: Router, private VeloService: VeloService) {
    this.form = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      description: [''],
      quantite: [0, [Validators.required, Validators.min(1)]]
    });
    
  }

  ngOnInit(): void {
    this.preloadEditData();
  }
  
  preloadEditData() {
    const editId = JSON.parse(localStorage.getItem('editVeloId') || 'null');
    if (editId) {
      this.VeloService.findById(editId).subscribe({
        next: (velo: VeloModel) => this.form.patchValue(velo),
        error: (err) => console.error('Failed to load vélo data', err)
      });
    }
  }

  onSubmit(): void {
    if (this.form.valid) {
      const veloData: VeloModel = this.form.value;
      if (veloData.id) {
        this.VeloService.update(veloData.id, veloData).subscribe({
          next: (response) => {
            console.log('Vélo mis à jour', response);
            this.router.navigate(['/dashboard']); // Adaptez selon votre route
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du vélo', error);
            alert('Erreur lors de la mise à jour des données.');
          }
        });
      } else {
        this.VeloService.create(veloData).subscribe({
          next: (response) => {
            console.log('Nouveau vélo créé', response);
            this.router.navigate(['/dashboard']); // Adaptez selon votre route
          },
          error: (error) => {
            console.error('Erreur lors de la création du vélo', error);
            alert('Erreur lors de la création des données.');
          }
        });
      }
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}