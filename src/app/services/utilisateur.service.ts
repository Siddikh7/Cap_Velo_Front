import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UtilisateurModel } from "../models/utilisateur.model";
import { Injectable } from "@angular/core";

/**
 * Service pour gérer les opérations liées aux utilisateurs.
 */
@Injectable({
  providedIn: 'root'
})
export class UtilisateurService {
  API_URL: string = "http://localhost:8080";
  API_ENTITY_NAME: string = "utilisateurs";

  constructor(private http: HttpClient) {}

  /**
   * Crée un nouvel utilisateur.
   * @param utilisateurModel Le modèle de l'utilisateur à créer.
   * @returns Un Observable de l'utilisateur créé.
   */
  create(utilisateurModel: UtilisateurModel): Observable<UtilisateurModel> {
    return this.http.post<UtilisateurModel>(`${this.API_URL}/${this.API_ENTITY_NAME}/`, utilisateurModel)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Trouve un utilisateur par son ID.
   * @param id L'ID de l'utilisateur.
   * @returns Un Observable de l'utilisateur trouvé.
   */
  findById(id: number): Observable<UtilisateurModel> {
    return this.http.get<UtilisateurModel>(`${this.API_URL}/${this.API_ENTITY_NAME}?id=${id}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Affiche tous les utilisateurs.
   * @returns Un Observable de la liste des utilisateurs.
   */
  showAll(): Observable<UtilisateurModel[]> {
    return this.http.get<UtilisateurModel[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Met à jour un utilisateur.
   * @param id L'ID de l'utilisateur.
   * @param utilisateurModel Le modèle de l'utilisateur à mettre à jour.
   * @returns Un Observable de l'utilisateur mis à jour.
   */
  update(id: number, utilisateurModel: UtilisateurModel): Observable<UtilisateurModel> {
    return this.http.put<UtilisateurModel>(`${this.API_URL}/${this.API_ENTITY_NAME}?id=${id}`, utilisateurModel)
      .pipe(catchError(this.errorHandler));
  }

  /**
   * Supprime un utilisateur.
   * @param id L'ID de l'utilisateur.
   * @returns Un Observable vide.
   */
  delete(id: number): Observable<never> {
    return this.http.delete<never>(`${this.API_URL}/${this.API_ENTITY_NAME}?id=${id}`)
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
