import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/config/auth.service';
import { Permissao } from '../../../login/models/permissao';
import { Imovel } from '../models/imovel';
import { Endereco } from '../models/endereco';
import { ImovelService } from '../../../services/locador/imovel.service';
import { ModalDeleteService } from '../../../services/modals/modal-delete.service';

@Component({
  selector: 'app-meus-imoveis',
  templateUrl: './meus-imoveis.component.html',
  styleUrl: './meus-imoveis.component.css',
})
export class MeusImoveisComponent {
  termoBusca: string = '';
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  imoveis: Imovel[] = [];
  itensPorPagina = 6;
  paginaAtual = 1;
  totalPaginas = Math.ceil(this.imoveis.length / this.itensPorPagina);
  imoveisPaginados: Imovel[] = [];
  selectedImovel: Imovel | null = null;

  public Permissao = Permissao;
  public permissaoUsuario: string = '';
  private locadorId: number | null = null;

  constructor(
    private router: Router,
    private authService: AuthService,
    private imovelService: ImovelService,
    private modalDeleteService: ModalDeleteService
  ) {}

  ngOnInit(): void {
    this.carregarPermissaoUsuario();
    this.preencherLocadorId();
  }

  cadastrarImovel(): void {
    this.router.navigate(['/usuario/cadastro-imovel']);
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
    if (!this.locadorId) {
      console.log('⏳ ID do locador não carregado ainda, aguardando...');
      return;
    }

    this.isLoading = true;

    this.imovelService.getImoveisByUsuarioId(this.locadorId).subscribe(
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
    this.router.navigate(['/usuario/detalhes-imovel', id]);
  }

  editarImovel(id: number): void {
    this.router.navigate(['/usuario/cadastro-imovel', id]);
  }

  deleteImovel(id: number): void {
    const imovelRemovido = this.imoveis.find((e) => e.id === id);
    this.imovelService.deleteImovelById(id.toString()).subscribe(
      () => {
        console.log('Imóvel deletado com sucesso!');
        this.fetchImoveis();
        this.showMessage(
          'success',
          `Imóvel "${imovelRemovido?.titulo || ''} - ${
            imovelRemovido?.endereco?.cidade || '-'
          }" deletado com sucesso!`
        );
      },
      (error) => {
        console.error('Erro ao deletar o imóvel:', error);
      }
    );
  }

  getInitial(name?: string): string {
    return name && name.length > 0 ? name.charAt(0).toUpperCase() : '';
  }

  getRandomColor(seed?: string): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Laranja pastel
      '#BAFFC9', // Verde pastel
      '#BAE1FF', // Azul pastel
      '#D5BAFF', // Roxo pastel
    ];
    const index =
      seed && seed.length > 0 ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }

  openModalDeletar(imovel: any): void {
    this.selectedImovel = imovel;
    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Imóvel',
        description: `Tem certeza que deseja excluir o imóvel <strong>${
          imovel.titulo
        } - ${imovel.endereco?.cidade || '-'}</strong>?`,
        item: imovel,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteImovel(imovel.id);
      }
    );
  }

  // exibirMensagemDeSucesso(): void {
  //   const state = window.history.state as { successMessage?: string };
  //   if (state?.successMessage) {
  //     this.successMessage = state.successMessage;
  //     setTimeout(() => (this.successMessage = ''), 3000);
  //     window.history.replaceState({}, document.title);
  //   }
  // }

  showMessage(type: 'success' | 'error', msg: string) {
    this.clearMessage();
    if (type === 'success') this.successMessage = msg;
    this.messageTimeout = setTimeout(() => this.clearMessage(), 3000);
  }

  clearMessage() {
    this.successMessage = '';
    if (this.messageTimeout) clearTimeout(this.messageTimeout);
  }

  private carregarPermissaoUsuario(): void {
    const usuario = this.authService.getUsuarioAutenticado();
    if (usuario && usuario.permissao) {
      switch (usuario.permissao) {
        case 'ROLE_ADMIN':
          this.permissaoUsuario = 'Admin';
          break;
        case 'ROLE_LOCADOR':
          this.permissaoUsuario = 'Locador';
          break;
        case 'ROLE_LOCATARIO':
          this.permissaoUsuario = 'Locatário';
          break;
        default:
          this.permissaoUsuario = 'Desconhecido';
      }
    }
  }

  get rotaDashboard(): string {
    switch (this.permissaoUsuario) {
      case 'Admin':
        return '/dashboard-locador';
      case 'Locador':
        return '/dashboard-locador';
      case 'Locatário':
        return '/inicio';
      default:
        return '/login';
    }
  }

  private preencherLocadorId(): void {
    this.authService.obterPerfilUsuario().subscribe({
      next: (usuario) => {
        console.log('Perfil do usuário obtido:', usuario);

        if (usuario && usuario.id) {
          const locadorId = (this.locadorId =
            typeof usuario.id === 'string'
              ? parseInt(usuario.id, 10)
              : usuario.id);
          this.fetchImoveis();
        }
      },
    });
  }
}
