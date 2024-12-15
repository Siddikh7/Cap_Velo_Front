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
  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private VeloService: VeloService) {
    this.form = this.fb.group({
      id: [null],
      nom: ['', Validators.required],
      description: [''],
      quantite: [0, [Validators.required, Validators.min(1)]],
      pointGeo: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this.preloadEditData();
  }

  preloadEditData() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.VeloService.findById(+id).subscribe({
          next: (velo: VeloModel) => this.form.patchValue(velo),
          error: (err: any) => console.error('Failed to load vélo data', err)
        });
      }
    });
  }

  // preloadEditData() {
  //   const editId = JSON.parse(localStorage.getItem('editVeloId') || 'null');
  //   if (editId) {
  //     this.VeloService.findById(editId).subscribe({
  //       next: (velo: VeloModel) => this.form.patchValue(velo),
  //       error: (err) => console.error('Failed to load vélo data', err)
  //     });
  //   }
  // }

  onSubmit(): void {
    if (this.form.valid) {
      const veloData: VeloModel = this.form.value;
      if (this.isEditMode && veloData.id) {
        this.VeloService.update(veloData.id, veloData).subscribe({
          next: (response) => {
            console.log('Vélo mis à jour', response);
            this.router.navigate(['/dashboard']);
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
            this.router.navigate(['/dashboard']);
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
