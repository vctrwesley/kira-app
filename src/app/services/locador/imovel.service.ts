import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Imovel } from '../../sistema/locador/models/imovel';
import { AuthService } from '../config/auth.service';
import { ImovelFactory } from '../../sistema/locador/models/factories/imovel.factory';

@Injectable({
  providedIn: 'root',
})
export class ImovelService {
  apiURL: string = environment.apiURLBase + '/api/imoveis';

  constructor(private http: HttpClient, private authService: AuthService) {}

  cadastrarImovel(imovel: Imovel): Observable<Imovel> {
    console.log('Dados enviados para o backend:', imovel);
    return this.http.post<Imovel>(this.apiURL, imovel).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao salvar o imóvel.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status) {
          errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getImoveis(): Observable<Imovel[]> {
    return this.http.get<Imovel[]>(this.apiURL).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar os imóveis.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status) {
          errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getImovelById(id: number): Observable<Imovel> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<any>(url).pipe(
      map(ImovelFactory.criar),
      catchError((error) => this.handleError('buscar o imóvel', error))
    );
  }

  atualizarImovel(id: string, imovel: Imovel): Observable<Imovel> {
    const url = `${this.apiURL}/${id}`;
    return this.http.put<Imovel>(url, imovel).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao atualizar o imóvel.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status) {
          errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  deleteImovelById(id: string): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error) => {
        let errorMessage = 'Erro ao deletar o imóvel.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status) {
          errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  buscarImoveisPorNome(nome: string): Observable<Imovel[]> {
    const url = `${this.apiURL}/search/${encodeURIComponent(nome)}`;
    return this.http.get<Imovel[]>(url).pipe(
      map((response) => response),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar imóveis por nome.';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status) {
          errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  getImoveisByUsuarioId(usuarioId: number): Observable<Imovel[]> {
    const url = `${this.apiURL}/usuario/${usuarioId}`;
    console.log('🔸 URL completa enviada:', url);

    return this.http.get<Imovel[]>(url).pipe(
      map((response) => {
        return response;
      }),
      catchError((error) => {
        let errorMessage = 'Erro ao buscar o imóvel.';

        if (error.error instanceof ErrorEvent) {
          errorMessage = `Erro: ${error.error.message}`;
        } else if (error.status) {
          errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
        }
        console.error(errorMessage);
        return throwError(() => new Error(errorMessage));
      })
    );
  }

  private handleError(contexto: string, error: any): Observable<never> {
    let errorMessage = `Erro ao ${contexto}.`;

    if (error.error instanceof ErrorEvent) {
      errorMessage = `Erro: ${error.error.message}`;
    } else if (error.status) {
      errorMessage = `Erro no servidor: ${error.status} - ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
