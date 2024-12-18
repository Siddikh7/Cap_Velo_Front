import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReservationModel } from '../models/reservation.model';

/**
 * Service pour gérer les opérations de réservation.
 */
@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  API_URL: string = 'http://localhost:8080';
  API_ENTITY_NAME: string = 'reservations';

  constructor(private http: HttpClient) {}

  /**
   * Crée une nouvelle réservation.
   * @param reservationModel Le modèle de réservation à créer.
   * @returns Un Observable de la réservation créée.
   */
  create(reservationModel: ReservationModel): Observable<ReservationModel> {
    return this.http.post<ReservationModel>(`${this.API_URL}/${this.API_ENTITY_NAME}`, reservationModel)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Trouve une réservation par ID de vélo et ID d'utilisateur.
   * @param idVelo L'ID du vélo.
   * @param idUtilisateur L'ID de l'utilisateur.
   * @returns Un Observable de la réservation trouvée.
   */
  findById(idVelo: number, idUtilisateur: number): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(`${this.API_URL}/${this.API_ENTITY_NAME}?utilisateurId=${idUtilisateur}&veloId=${idVelo}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Affiche toutes les réservations.
   * @returns Un Observable de la liste des réservations.
   */
  showAll(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Met à jour une réservation.
   * @param idVelo L'ID du vélo.
   * @param idUtilisateur L'ID de l'utilisateur.
   * @param reservationModel Le modèle de réservation à mettre à jour.
   * @returns Un Observable de la réservation mise à jour.
   */
  update(idVelo: number, idUtilisateur: number, reservationModel: ReservationModel): Observable<ReservationModel> {
    return this.http.put<ReservationModel>(`${this.API_URL}/${this.API_ENTITY_NAME}?utilisateurId=${idUtilisateur}&veloId=${idVelo}`, reservationModel)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Supprime une réservation.
   * @param idVelo L'ID du vélo.
   * @param idUtilisateur L'ID de l'utilisateur.
   * @returns Un Observable vide.
   */
  delete(idVelo: number, idUtilisateur: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/${this.API_ENTITY_NAME}?utilisateurId=${idUtilisateur}&veloId=${idVelo}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Gère les erreurs de requête HTTP.
   * @param error L'erreur survenue.
   * @returns Un Observable d'erreur.
   */
  private errorHandler(error: any): Observable<never> {
    console.error('y a un souci qlq part', error);
    return throwError(() => new Error('Erreur survenue lors de la requête'));
  }
}
