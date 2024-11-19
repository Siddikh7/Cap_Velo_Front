import { HttpClient } from "@angular/common/http";
import { ReservationModel } from "../models/reservation.model";
import { catchError, Observable, throwError } from "rxjs";

export class ReservationService {
  API_URL: string = "http://localhost:8080";
  API_ENTITY_NAME: string = "reservations";

  constructor(private readonly http: HttpClient) {}

  getAll(): Observable<ReservationModel[]> {
    return this.http.get<ReservationModel[]>(`${this.API_URL}/${this.API_ENTITY_NAME}/`)
      .pipe(catchError(this.errorHandler));
  }
  findById(utilisateurId: number, veloId: number): Observable<ReservationModel> {
    return this.http.get<ReservationModel>(`${this.API_URL}/${this.API_ENTITY_NAME}/id?utilisateurId=${utilisateurId}&veloId=${veloId}`)
      .pipe(catchError(this.errorHandler));
  }
  create(reservationModel: ReservationModel): Observable<ReservationModel> {
    return this.http.post<ReservationModel>(`${this.API_URL}/${this.API_ENTITY_NAME}/`,reservationModel)
      .pipe(catchError(this.errorHandler));
  }
  update(
    utilisateurId: number,
    veloId: number,
    reservationModel: ReservationModel
  ): Observable<ReservationModel> {
    return this.http.put<ReservationModel>(`${this.API_URL}/${this.API_ENTITY_NAME}/?utilisateurId=${utilisateurId}&veloId=${veloId}`,reservationModel)
      .pipe(catchError(this.errorHandler));
  }
  delete(utilisateurId: number, veloId: number): Observable<never> {
    return this.http.delete<never>(`${this.API_URL}/${this.API_ENTITY_NAME}/?utilisateurId=${utilisateurId}&veloId=${veloId}`)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Observable<never> {
    console.error('y a un souci qlq part', error);
    return throwError(() => new Error('Erreur survenue lors de la requête'));
  }

}
