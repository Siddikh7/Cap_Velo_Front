import { HttpClient } from "@angular/common/http";
import { catchError, Observable, throwError } from "rxjs";
import { UtilisateurModel } from "../models/utilisateur.model";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root' // Rend le service disponible globalement
})

export class UtilisateurService{
  API_URL : string = "http://localhost:8080";
  API_ENTITY_NAME : string = "utilisateurs";

  constructor(private http: HttpClient) {}

  create(utilisateurModel: UtilisateurModel) : Observable<UtilisateurModel>{
    return this.http.post<UtilisateurModel>(`${this.API_URL}/${this.API_ENTITY_NAME}/`, utilisateurModel)
      .pipe(catchError(this.errorHandler));
  }
  findById(id : number) : Observable<UtilisateurModel>{
    return this.http.get<UtilisateurModel>(`${this.API_URL}/${this.API_ENTITY_NAME}`+`?id=${id}`)
      .pipe(catchError(this.errorHandler));
  }
  showAll() : Observable<UtilisateurModel[]>{
    return this.http.get<UtilisateurModel[]>(`${this.API_URL}/${this.API_ENTITY_NAME}/`)
      .pipe(catchError(this.errorHandler));
  }
  update(id:number, utilisateurModel: UtilisateurModel) : Observable<UtilisateurModel>{
    return this.http.put<UtilisateurModel>(`${this.API_URL}/${this.API_ENTITY_NAME}/?id=${id}`, utilisateurModel)
      .pipe(catchError(this.errorHandler));
  }
  delete(id: number) : Observable<never>{
    return this.http.delete<never>(`${this.API_URL}/${this.API_ENTITY_NAME}/${id}`)
      .pipe(catchError(this.errorHandler));
  }
  private errorHandler(error: any): Observable<never> {
    console.error('y a un souci qlq part', error);
    return throwError(() => new Error('Erreur survenue lors de la requête'));
  }
}
