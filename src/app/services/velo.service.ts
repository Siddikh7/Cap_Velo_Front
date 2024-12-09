//en gros on va implementer une methode pour chaque methode du controller du dto du coté backend
import {HttpClient} from "@angular/common/http";
import {VeloModel} from "../models/velo.model";
import {catchError, Observable, throwError} from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class VeloService {
  API_URL : string = "http://localhost:8080";
  API_ENTITY_NAME : string = "velos";

  constructor(private http: HttpClient) {}

  create(veloModel: VeloModel) : Observable<VeloModel>{
    return this.http.post<VeloModel>(`${this.API_URL}/${this.API_ENTITY_NAME}`, veloModel)
      .pipe(catchError(this.errorHandler));
    //le pipe sert à composer des opérateurs dans une chaine, il est utilisé pour appliquer l'opérateur catchError à l'Observable retourné par la méthode post, catchError permet de gérer les erreurs
  }
  findById(id:number) :Observable<VeloModel>{
    return this.http.get<VeloModel>(`${this.API_URL}/${this.API_ENTITY_NAME}`+`?id=${id}`)
      .pipe(catchError(this.errorHandler));
  }
  showAll() : Observable<VeloModel[]>{
    return this.http.get<VeloModel[]>(`${this.API_URL}/${this.API_ENTITY_NAME}`)
      .pipe(catchError(this.errorHandler));
  }
  update(id:number, veloModel: VeloModel) : Observable<VeloModel>{
    return this.http.put<VeloModel>(`${this.API_URL}/${this.API_ENTITY_NAME}?id=${id}`, veloModel)
      .pipe(catchError(this.errorHandler));
  }
  delete(id: number) : Observable<never>{
    return this.http.delete<never>(`${this.API_URL}/${this.API_ENTITY_NAME}?id=${id}`)
      .pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: any): Observable<never> {
    console.error('y a un souci qlq part', error);
    return throwError(() => new Error('Erreur survenue lors de la requête'));
  }

}
