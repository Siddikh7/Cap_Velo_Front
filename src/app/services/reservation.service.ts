import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";
import { ReservationModel } from "../models/reservation.model";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  API_URL: string = "http://localhost:8080";
  API_ENTITY_NAME: string = "reservations";

  constructor(private http: HttpClient) {}

  create(reservationModel: ReservationModel): Observable<ReservationModel> {
    return this.http.post<ReservationModel>(`${this.API_URL}/${this.API_ENTITY_NAME}/`, reservationModel)
      .pipe(catchError(this.errorHandler));
  }

  findById(idVelo: number, idUtilisateur : number): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(`${this.API_URL}/${this.API_ENTITY_NAME}` + `?utilisateurId=${idUtilisateur}&veloId=${idVelo}`)
      .pipe(catchError(this.errorHandler));
  }

  showAll(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(`${this.API_URL}/${this.API_ENTITY_NAME}/`)
      .pipe(catchError(this.errorHandler));
  }

  update(idVelo: number, idUtilisateur : number, reservationModel: ReservationModel): Observable<ReservationModel> {
    return this.http.put<ReservationModel>(`${this.API_URL}/${this.API_ENTITY_NAME}/?utilisateurId=${idUtilisateur}&veloId=${idVelo}`, reservationModel)
      .pipe(catchError(this.errorHandler));
  }

  delete(idVelo: number, idUtilisateur : number): Observable<never> {
    return this.http.delete<never>(`${this.API_URL}/${this.API_ENTITY_NAME}/?utilisateurId=${idUtilisateur}&veloId=${idVelo}`)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Observable<never> {
    console.error('y a un souci qlq part', error);
    return throwError(() => new Error('Erreur survenue lors de la requête'));
  }
}
