import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {ActivatedRoute, Router} from '@angular/router';
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
  isEditMode: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private route: ActivatedRoute, 
    private veloService: VeloService
  ) {
    this.form = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      description: [''],
      quantite: [0, [Validators.required, Validators.min(1)]],
      pointGeo: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        const numericId = +id;  // Convertissez l'ID en nombre
        console.log('id =', numericId);
        this.form.patchValue({ id: numericId });  // Mettez à jour l'ID en utilisant patchValue
        this.veloService.findById(numericId).subscribe({
          next: (velo: VeloModel) => {
            this.form.patchValue(velo);  // Mettez à jour le formulaire avec les données récupérées
            console.log(velo)
          },
          error: (err: any) => console.error('Failed to load vélo data', err)
        });
      } else {
        console.log('on met tout à null');
        this.isEditMode = false;
        this.form.reset();  // Réinitialisez le formulaire pour enlever toutes les données précédentes
      }
    });
  }
  
  onSubmit(): void {
    console.log('Tentative de soumission du formulaire, Mode édition:', this.isEditMode, 'ID:', this.form.value.id);
  
    if (this.isEditMode) {
      console.log('Mode édition est activé');
      if (this.form.value.id) {
        console.log('ID du vélo est présent:', this.form.value.id);
        this.veloService.update(this.form.value.id, this.form.value).subscribe({
          next: (response) => {
            console.log('Vélo mis à jour avec succès', response);
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            console.error('Erreur lors de la mise à jour du vélo', error);
            alert('Erreur lors de la mise à jour des données.');
          }
        });
      } else {
        console.error('L\'ID du vélo n\'est pas présent dans les données du formulaire');
      }
    } else {
      console.log('Mode édition n\'est pas activé, création d\'un nouveau vélo.');
      // Ici, vous pouvez gérer la logique de création si nécessaire
    }
  }

  onCancel(): void {
    this.router.navigate(['/dashboard']);
  }
}