import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { VeloService } from '../../services/velo.service';
import { ReservationService } from '../../services/reservation.service';
import { UtilisateurService } from '../../services/utilisateur.service';
import { VeloModel } from '../../models/velo.model';
import { UtilisateurModel } from '../../models/utilisateur.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-add-reservation',
  standalone: true,
  templateUrl: './add-reservation-component.component.html',
  styleUrls: ['./add-reservation-component.component.css'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatButtonModule,
    MatInputModule
  ]
})
export class AddReservationComponent implements OnInit {
  form: FormGroup;
  velos: VeloModel[] = [];
  utilisateurs: UtilisateurModel[] = [];

  constructor(
    private fb: FormBuilder,
    private veloService: VeloService,
    private reservationService: ReservationService,
    private utilisateurService: UtilisateurService,
    private router: Router
  ) {
    this.form = this.fb.group({
      veloId: ['', Validators.required],
      utilisateurId: ['', Validators.required],
      reservation: ['', Validators.required] // Add reservation field
    });
  }

  ngOnInit(): void {
    this.loadVelos();
    this.loadUtilisateurs();
  }

  loadVelos(): void {
    this.veloService.showAll().subscribe({
      next: (data) => this.velos = data,
      error: (err) => console.error('Failed to load vélos', err)
    });
  }

  loadUtilisateurs(): void {
    this.utilisateurService.showAll().subscribe({
      next: (data) => this.utilisateurs = data,
      error: (err) => console.error('Failed to load utilisateurs', err)
    });
  }

  onSave(): void {
    if (this.form.valid) {
      const reservationData = this.form.value;
      this.reservationService.create(reservationData).subscribe({
        next: () => {
          console.log('Reservation created');
          this.router.navigate(['/reservations']);
        },
        error: (err: any) => {
          console.error('Failed to create reservation', err);
          alert('Erreur lors de la création de la réservation.');
        }
      });
    } else {
      alert('Veuillez sélectionner un vélo, un utilisateur et entrer un numéro de réservation.');
    }
  }
}
