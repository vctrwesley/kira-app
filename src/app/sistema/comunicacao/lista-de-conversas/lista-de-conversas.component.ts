import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/config/auth.service';
import { Permissao } from '../../../login/models/permissao';
import { ModalDeleteService } from '../../../services/modals/modal-delete.service';
import { FeedbackComponent } from '../../../shared/feedback/feedback.component';
import { ChatService } from '../../../services/comunicacao/chat.service';
import { Conversa } from '../models/conversa';

@Component({
  selector: 'app-lista-de-conversas',
  templateUrl: './lista-de-conversas.component.html',
  styleUrl: './lista-de-conversas.component.css',
})
export class ListaDeConversasComponent implements OnInit, AfterViewInit {
  @ViewChild(FeedbackComponent) feedbackComponent!: FeedbackComponent;

  termoBusca: string = '';
  conversasFiltradas: Conversa[] = [];
  mensagemBusca: string = '';
  isLoading = false;
  successMessage: string = '';
  messageTimeout: any;

  public Permissao = Permissao;
  public permissaoUsuario: string = '';
  private usuarioId: number | null = null;

  conversas: Conversa[] = [
    {
      id: 1,
      titulo: 'João Silva',
      avatarUrl: '',
      ultimaMensagem: 'Olá! Tudo bem?',
      dataUltimaMensagem: new Date(),
      lida: false,
      participantes: ['Locador', 'Locatário'],
      badge: 2,
    },
    {
      id: 2,
      titulo: 'Maria Oliveira',
      avatarUrl: '',
      ultimaMensagem: 'Enviei os documentos!',
      dataUltimaMensagem: new Date(Date.now() - 3600 * 1000),
      lida: true,
      participantes: ['Locador', 'Locatário'],
      badge: 0,
    },
    {
      id: 3,
      titulo: 'Carlos Souza',
      avatarUrl: '',
      ultimaMensagem: 'Quando posso visitar o imóvel?',
      dataUltimaMensagem: new Date(Date.now() - 7200 * 1000),
      lida: false,
      participantes: ['Locador', 'Locatário'],
      badge: 1,
    },
  ];

  conversaSelecionada?: Conversa;

  constructor(
    private router: Router,
    private authService: AuthService,
    private modalDeleteService: ModalDeleteService,
    private chatService: ChatService
  ) {}

  ngOnInit(): void {
    this.carregarPermissaoUsuario();
    this.preencherUsuarioId();
    this.conversasFiltradas = this.conversas;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.exibirMensagemDeSucesso();
    }, 0);
  }

  onSearch(searchTerm: string) {
    if (!searchTerm || searchTerm.trim() === '') {
      this.mensagemBusca = '';
      this.conversasFiltradas = this.conversas;
      return;
    }
    this.conversasFiltradas = this.conversas.filter((conversa) =>
      conversa.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    );
    this.mensagemBusca =
      this.conversasFiltradas.length === 0 ? 'Busca não encontrada' : '';
  }

  selecionarConversa(conversa: Conversa) {
    this.conversaSelecionada = conversa;
    this.router.navigate(['/usuario/chat', conversa.id]);
  }

  deleteChat(id: number): void {
    // const chatRemovido = this.chats.find((e) => e.id === id);
    // this.chatService.deleteChatById(id.toString()).subscribe(
    //   () => {
    //     console.log('Chat deletado com sucesso!');
    //     this.fetchChats();
    //     this.showFeedback(
    //       'success',
    //       `Chat "${chatRemovido?.titulo || ''} - ${
    //         chatRemovido?.endereco?.cidade || '-'
    //       }" deletado com sucesso!`
    //     );
    //   },
    //   (error) => {
    //     this.showFeedback('error', 'Erro ao deletar o chat');
    //   }
    // );
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

  openModalDeletar(chat: any): void {
    // this.selectedChat = chat;
    this.modalDeleteService.openModal(
      {
        title: 'Remoção de Chat',
        description: `Tem certeza que deseja excluir o chat <strong>${
          chat.titulo
        } - ${chat.endereco?.cidade || '-'}</strong>?`,
        item: chat,
        deletarTextoBotao: 'Remover',
        size: 'md',
      },
      () => {
        this.deleteChat(chat.id);
      }
    );
  }

  private exibirMensagemDeSucesso(): void {
    const state = window.history.state as {
      successMessage?: string;
      errorMessage?: string;
    };

    if (state?.successMessage) {
      this.showFeedback('success', state.successMessage);
      window.history.replaceState({}, document.title);
    }

    if (state?.errorMessage) {
      this.showFeedback('error', state.errorMessage);
      window.history.replaceState({}, document.title);
    }
  }

  private showFeedback(type: 'success' | 'error', message: string): void {
    const title = type === 'success' ? 'Sucesso' : 'Erro';
    this.feedbackComponent?.show(type, title, message);
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

  private preencherUsuarioId(): void {
    this.authService.obterPerfilUsuario().subscribe({
      next: (usuario) => {
        console.log('Perfil do usuário obtido:', usuario);

        if (usuario && usuario.id) {
          const usuarioId = (this.usuarioId =
            typeof usuario.id === 'string'
              ? parseInt(usuario.id, 10)
              : usuario.id);
          // this.fetchChats();
        }
      },
    });
  }
}
