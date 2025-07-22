import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface FavoritoResponse {
  id: number;
  imovel: {
    id: number;
    titulo: string;
    preco: number;
    tipo: string;
    endereco: {
      rua: string;
      numero: string;
      bairro: string;
      cidade: string;
      estado: string;
    };
    fotos: Array<{ url: string }>;
    numQuartos?: number;
    area?: number;
    mobiliado?: boolean;
  };
}

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {
  apiURL: string = environment.apiURLBase + '/api/favoritos';

  constructor(private http: HttpClient) {}

  adicionarFavorito(imovelId: number): Observable<void> {
    return this.http.post<void>(`${this.apiURL}/imovel/${imovelId}`, {});
  }

  listarFavoritos(): Observable<FavoritoResponse[]> {
    return this.http.get<FavoritoResponse[]>(this.apiURL);
  }

  removerFavorito(favoritoId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiURL}/${favoritoId}`);
  }
}