import {HttpClient} from "@angular/common/http";


export class UtilisateurService{
  API_URL : string = "http://localhost:8080";
  API_ENTITY_NAME : string = "utilistaurs";

  constructor(private readonly http: HttpClient) {

  }
}
