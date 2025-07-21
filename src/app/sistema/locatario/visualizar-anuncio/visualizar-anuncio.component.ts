import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Imovel } from '../../locador/models/imovel';
import { ImovelService } from '../../../services/locador/imovel.service';

@Component({
  selector: 'app-visualizar-anuncio',
  templateUrl: './visualizar-anuncio.component.html',
  styleUrl: './visualizar-anuncio.component.css'
})
export class VisualizarAnuncioComponent implements OnInit {
  imovel: Imovel | null = null;
  isLoading = false;
  errorMessage = '';
  imovelId: number = 0;
  favoritos: number[] = [];
  
  private readonly FAVORITOS_STORAGE_KEY = 'kira-favoritos';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private imovelService: ImovelService
  ) {}

  ngOnInit(): void {
    this.carregarFavoritos();
    this.obterIdImovel();
    this.carregarImovel();
  }

  private obterIdImovel(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.imovelId = Number(id);
    } else {
      this.errorMessage = 'ID do imóvel não encontrado';
      this.router.navigate(['/inicio']);
    }
  }

  private carregarImovel(): void {
    if (!this.imovelId) return;
    
    this.isLoading = true;
    this.imovelService.getImovelById(this.imovelId).subscribe(
      (imovel: Imovel) => {
        this.imovel = imovel;
        this.isLoading = false;
        console.log('Imóvel carregado:', imovel);
      },
      (error) => {
        console.error('Erro ao carregar imóvel:', error);
        this.errorMessage = 'Erro ao carregar os dados do imóvel';
        this.isLoading = false;
      }
    );
  }

  goBack(): void {
    this.location.back();
  }

  voltarParaInicio(): void {
    this.router.navigate(['/inicio']);
  }

  favoritar(): void {
    if (!this.imovelId) return;
    
    if (this.isFavoritado(this.imovelId)) {
      this.removerFavorito(this.imovelId);
    } else {
      this.adicionarFavorito(this.imovelId);
    }
  }

  private adicionarFavorito(id: number): void {
    if (!this.favoritos.includes(id)) {
      this.favoritos.push(id);
      this.salvarFavoritos();
      console.log(`Imóvel ${id} adicionado aos favoritos`);
    }
  }

  private removerFavorito(id: number): void {
    const index = this.favoritos.indexOf(id);
    if (index > -1) {
      this.favoritos.splice(index, 1);
      this.salvarFavoritos();
      console.log(`Imóvel ${id} removido dos favoritos`);
    }
  }

  private salvarFavoritos(): void {
    try {
      localStorage.setItem(this.FAVORITOS_STORAGE_KEY, JSON.stringify(this.favoritos));
    } catch (error) {
      console.error('Erro ao salvar favoritos no localStorage:', error);
    }
  }

  private carregarFavoritos(): void {
    try {
      const favoritosString = localStorage.getItem(this.FAVORITOS_STORAGE_KEY);
      if (favoritosString) {
        this.favoritos = JSON.parse(favoritosString);
      }
    } catch (error) {
      console.error('Erro ao carregar favoritos do localStorage:', error);
      this.favoritos = [];
    }
  }

  isFavoritado(id: number): boolean {
    return this.favoritos.includes(id);
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
    const index = seed && seed.length > 0 ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }

  entrarEmContato(): void {
    // Implementar lógica de contato (WhatsApp, telefone, etc.)
    console.log('Entrar em contato com o locador');
  }
}