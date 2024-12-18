import { HttpClient } from "@angular/common/http";
import { VeloModel } from "../models/velo.model";
import { catchError, Observable, throwError } from "rxjs";
import { Injectable } from "@angular/core";

/**
 * Service pour gérer les opérations liées aux vélos.
 */
@Injectable({
  providedIn: 'root'
})
export class VeloService {
  API_URL: string = "http://localhost:8080";
  API_ENTITY_NAME: string = "velos";

  constructor(private http: HttpClient) {}

  /**
   * Crée un nouveau vélo.
   * @param veloModel Le modèle du vélo à créer.
   * @returns Un Observable du vélo créé.
   */
  create(veloModel: VeloModel): Observable<VeloModel> {
    return this.http.post<VeloModel>(`${this.API_URL}/${this.API_ENTITY_NAME}`, veloModel)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Trouve un vélo par son ID.
   * @param id L'ID du vélo.
   * @returns Un Observable du vélo trouvé.
   */
  findById(id: number): Observable<VeloModel> {
    return this.http.get<VeloModel>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Affiche tous les vélos.
   * @returns Un Observable de la liste des vélos.
   */
  showAll(): Observable<VeloModel[]> {
    return this.http.get<VeloModel[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Met à jour un vélo.
   * @param id L'ID du vélo.
   * @param veloModel Le modèle du vélo à mettre à jour.
   * @returns Un Observable du vélo mis à jour.
   */
  update(id: number, veloModel: VeloModel): Observable<VeloModel> {
    return this.http.put<VeloModel>(`${this.API_URL}/${this.API_ENTITY_NAME}?id=${id}`, veloModel)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Supprime un vélo.
   * @param id L'ID du vélo.
   * @returns Un Observable vide.
   */
  delete(id: number): Observable<any> {
    console.log(`URL de suppression : ${this.API_URL}/${this.API_ENTITY_NAME}/${id}`);
    return this.http.delete<any>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Sauvegarde les données d'un vélo (création ou mise à jour).
   * @param veloModel Le modèle du vélo à sauvegarder.
   * @returns Un Observable du vélo sauvegardé.
   */
  saveData(veloModel: VeloModel): Observable<VeloModel> {
    if (veloModel.id) {
      return this.update(veloModel.id, veloModel);
    } else {
      return this.create(veloModel);
    }
  }

  /**
   * Gère les erreurs de requête HTTP.
   * @param error L'erreur survenue.
   * @returns Un Observable d'erreur.
   */
  private errorHandler(error: any): Observable<any> {
    console.error('y a un souci qlq part', error);
    return throwError(() => new Error('Erreur survenue lors de la requête'));
  }
}
