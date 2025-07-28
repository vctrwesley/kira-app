import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Usuario } from '../../login/models/usuario';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {
  apiURL: string = environment.apiURLBase + '/api/usuarios';

  constructor(private http: HttpClient) {}

  cadastrarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiURL, usuario).pipe(
      map((response) => response),
      catchError((error) => {
        console.error('Erro no servidor:', error);
        return throwError(() => error);
      })
    );
  }
}
