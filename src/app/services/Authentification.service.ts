import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/**
 * Service pour gérer l'authentification des utilisateurs.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/utilisateurs';
  private currentUser: any = null;

  constructor(private http: HttpClient) {}

  /**
   * Inscrit un nouvel utilisateur.
   * @param user Les informations de l'utilisateur.
   * @returns Un Observable de l'utilisateur inscrit.
   */
  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}`, user);
  }

  /**
   * Connecte un utilisateur.
   * @param credentials Les informations de connexion.
   * @returns Un Observable de l'utilisateur connecté.
   */
  login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      map((user: any) => {
        this.currentUser = user;
        console.log("la connexion marche?");
        return user;
      })
    );
  }

  /**
   * Obtient l'utilisateur actuellement connecté.
   * @returns L'utilisateur actuellement connecté.
   */
  getCurrentUser() {
    return this.currentUser;
  }
}
