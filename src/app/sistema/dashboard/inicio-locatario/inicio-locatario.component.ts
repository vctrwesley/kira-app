import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Imovel } from '../../locador/models/imovel';
import { ImovelService } from '../../../services/locador/imovel.service';
import { FavoritoService, FavoritoResponse } from '../../../services/locatario/favorito.service';

@Component({
  selector: 'app-inicio-locatario',
  templateUrl: './inicio-locatario.component.html',
  styleUrl: './inicio-locatario.component.css'
})
export class InicioLocatarioComponent implements OnInit {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;

  imoveis: Imovel[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.imoveis.length / this.itensPorPagina);
  imoveisPaginados: Imovel[] = [];
  favoritos: Map<number, number> = new Map();

  private readonly FAVORITOS_STORAGE_KEY = 'kira-favoritos';

  constructor(
    private router: Router,
    private imovelService: ImovelService,
    private favoritoService: FavoritoService
  ) {}

  ngOnInit(): void {
    this.carregarFavoritos();
    this.fetchImoveis();
    this.atualizarPaginacao();
  }

  onSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.mensagemBusca = '';
      this.fetchImoveis();
      return;
    }
    this.isLoading = true;
    this.imovelService.buscarImoveisPorNome(searchTerm).subscribe(
      (imoveis: Imovel[]) => {
        this.imoveis = imoveis;
        this.paginaAtual = 1;
        this.totalPaginas = Math.ceil(
          this.imoveis.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
        if (!imoveis || imoveis.length === 0) {
          this.mensagemBusca = 'Busca não encontrada';
        }
      },
      (error) => {
        console.error('Erro ao buscar imóveis:', error);
        this.isLoading = false;
        if (error.message && error.message.includes('404')) {
          this.imoveis = [];
          this.atualizarPaginacao();
          this.mensagemBusca = 'Busca não encontrada';
        }
      }
    );
  }

  atualizarPaginacao(): void {
    const inicio = (this.paginaAtual - 1) * this.itensPorPagina;
    const fim = inicio + this.itensPorPagina;
    this.imoveisPaginados = this.imoveis.slice(inicio, fim);
  }

  get totalItens() {
    return this.imoveis.length;
  }

  onPaginaMudou(novaPagina: number) {
    this.paginaAtual = novaPagina;
    this.atualizarPaginacao();
  }

  fetchImoveis(): void {
    this.isLoading = true;

    this.imovelService.getImoveis().subscribe(
      (imoveis: Imovel[]) => {
        console.log('Imóveis retornados:', imoveis);
        this.imoveis = imoveis;
        this.totalPaginas = Math.ceil(
          this.imoveis.length / this.itensPorPagina
        );
        this.atualizarPaginacao();
        this.isLoading = false;
      },
      (error) => {
        console.error('Erro ao carregar imóveis:', error);
        this.isLoading = false;
      }
    );
  }

  visualizarImovel(id: number): void {
    this.router.navigate(['/usuario/detalhes-anuncio', id]);
  }

  favoritar(id: number): void {
    if (this.isFavoritado(id)) {
      this.removerFavorito(id);
    } else {
      this.adicionarFavorito(id);
    }
  }

  private adicionarFavorito(imovelId: number): void {
    this.favoritoService.adicionarFavorito(imovelId).subscribe({
      next: () => {
        console.log(`Imóvel ${imovelId} adicionado aos favoritos`);
        // Recarregar favoritos para obter o ID do favorito
        this.carregarFavoritos();
      },
      error: (error) => {
        console.error('Erro ao adicionar favorito:', error);
      }
    });
  }

  private removerFavorito(imovelId: number): void {
    this.favoritoService.removerFavorito(imovelId).subscribe({
      next: () => {
        console.log(`Imóvel ${imovelId} removido dos favoritos`);
        this.carregarFavoritos();
      },
      error: (error) => {
        console.error('Erro ao remover favorito:', error);
      }
    });
  }

  private carregarFavoritos(): void {
    this.favoritoService.listarFavoritos().subscribe({
      next: (favoritos) => {
        this.favoritos.clear();
        favoritos.forEach((favorito) => {
          this.favoritos.set(favorito.imovel.id, favorito.id);
        });
      },
      error: (error) => {
        console.error('Erro ao carregar favoritos:', error);
      }
    });
  }

  isFavoritado(id: number): boolean {
    return this.favoritos.has(id);
  }

  getInitial(name?: string): string {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : '';
  }

  getTagColor(tipo?: string): string {
    const colors: { [key: string]: string } = {
      'APARTAMENTO': '#b3e9ffff',
      'CASA': '#ffbaeeff',
      'QUARTO': '#BAFFC9',
    };
    return colors[tipo || ''] || '#FFFFFF';
  }

  getRandomColor(seed?: string): string {
    const colors = [
      '#FFB3BA',
      '#FFDFBA',
      '#BAFFC9',
      '#BAE1FF',
      '#D5BAFF',
    ];
    const index =
      seed && seed.length > 0 ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }
}