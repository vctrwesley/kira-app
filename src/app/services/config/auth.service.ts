import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/internal/operators/map';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Usuario } from '../../login/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiURL: string = environment.apiURLBase + '/api/usuarios';
  tokenURL: string = environment.apiURLBase + environment.obterTokenUrl;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private http: HttpClient) {}

  obterToken() {
    return localStorage.getItem('access_token');
  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token) {
      const expired = this.jwtHelper.isTokenExpired(token);

      return !expired;
    }
    return false;
  }

  getUsuarioAutenticado(): Usuario | null {
    const userJson = localStorage.getItem('usuario');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return null;
  }

  getUserIdFromToken(): string | null {
    const token = this.obterToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken?.sub || null;
    }
    return null;
  }

  obterPerfilUsuario(): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiURL}/token`).pipe(
      map((response) => response),
      catchError((error: HttpErrorResponse) => {
        console.error('Erro ao obter perfil do usuário:', error);
        return throwError(
          'Erro ao obter perfil do usuário. Por favor, tente novamente.'
        );
      })
    );
  }

  tentarLogar(email: string, password: string): Observable<any> {
    const params = new HttpParams()
      .set('username', email)
      .set('password', password)
      .set('grant_type', 'password');

    const headers = {
      Authorization: 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    console.log(
      'Client credentials:',
      btoa(`${this.clientID}:${this.clientSecret}`)
    );
    console.log('Headers:', headers);

    return this.http.post(this.tokenURL, params.toString(), { headers });
  }
}
