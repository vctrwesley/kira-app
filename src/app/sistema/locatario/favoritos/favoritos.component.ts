import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FavoritoService, FavoritoResponse } from '../../../services/locatario/favorito.service';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {
  favoritos: FavoritoResponse[] = [];
  isLoading = false;
  
  itensPorPagina = 9;
  paginaAtual = 1;
  totalPaginas = 0;
  favoritosPaginados: FavoritoResponse[] = [];

  constructor(
    private router: Router,
    private favoritoService: FavoritoService
  ) {}

  ngOnInit(): void {
    this.carregarFavoritos();
  }

  carregarFavoritos(): void {
    this.isLoading = true;
    this.favoritoService.listarFavoritos().subscribe({
      next: (favoritos: FavoritoResponse[]) => {
        this.favoritos = favoritos;
        this.totalPaginas = Math.ceil(this.favoritos.length / this.itensPorPagina);
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erro ao carregar favoritos:', error);
        this.isLoading = false;
      }
    });
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.favoritosPaginados = this.favoritos.slice(inicio, fim);
  }

  get totalItens() {
    return this.favoritos.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  visualizarImovel(id: number): void {
    this.router.navigate(['/usuario/detalhes-anuncio', id]);
  }

  removerFavorito(favorito: FavoritoResponse): void {
    this.favoritoService.removerFavorito(favorito.id).subscribe({
      next: () => {
        // console.log(`Favorito ${favorito.id} removido`);
        this.carregarFavoritos(); // Recarregar a lista
      },
      error: (error) => {
        console.error('Erro ao remover favorito:', error);
      }
    });
  }

  getTagColor(tipo?: string): string {
    const colors: { [key: string]: string } = {
      'APARTAMENTO': '#b3e9ffff',
      'CASA': '#ffbaeeff',
      'QUARTO': '#BAFFC9',
    };
    return colors[tipo || ''] || '#FFFFFF';
  }
}