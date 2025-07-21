import {
  Component,
  ElementRef,
  OnInit,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/config/auth.service';
import { Usuario } from '../../login/models/usuario';
import { ModalConfirmacaoService } from '../../services/modals/modal-confirmacao.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('header') header!: ElementRef;
  @ViewChild('content') content!: ElementRef;
  @ViewChild('dropdownMenu') dropdownMenu!: ElementRef;
  @ViewChild('dropdownToggle') dropdownToggle!: ElementRef;

  isSidebarOpen = false;
  isDropdownOpen = false;

  nomeUsuario: string = '';
  permissaoUsuario: string = '';
  fotoUsuario: string = '';

  // Mapeamento das permissões para suas descrições
  private permissaoDescricao: { [key: string]: string } = {
    ADMIN: 'Administrador',
    LOCADOR: 'Locador',
    LOCATARIO: 'Usuário',
  };

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
    private modalConfirmacaoService: ModalConfirmacaoService
  ) {}

  ngOnInit(): void {
    this.carregarPerfilUsuario();
  }

  ngAfterViewInit(): void {
    if (!this.sidebar || !this.header || !this.content) {
      console.error('Erro: Elementos da Navbar não foram encontrados');
    }
  }

  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;

    if (this.sidebar && this.header && this.content) {
      if (this.isSidebarOpen) {
        this.renderer.addClass(this.sidebar.nativeElement, 'show-sidebar');
        this.renderer.addClass(this.header.nativeElement, 'left-pd');
        this.renderer.addClass(this.content.nativeElement, 'shifted');
        // 🔹 Ajusta a margem dinamicamente para 280px
        this.renderer.setStyle(
          this.content.nativeElement,
          'margin-left',
          '280px'
        );
      } else {
        this.renderer.removeClass(this.sidebar.nativeElement, 'show-sidebar');
        this.renderer.removeClass(this.header.nativeElement, 'left-pd');
        this.renderer.removeClass(this.content.nativeElement, 'shifted');
        // 🔹 Ajusta a margem dinamicamente para 90px
        this.renderer.setStyle(
          this.content.nativeElement,
          'margin-left',
          '90px'
        );
      }
    }
  }

  closeSidebar(): void {
    this.isSidebarOpen = false;

    if (this.sidebar && this.header && this.content) {
      this.renderer.removeClass(this.sidebar.nativeElement, 'show-sidebar');
      this.renderer.removeClass(this.header.nativeElement, 'left-pd');
      this.renderer.removeClass(this.content.nativeElement, 'shifted');
    }
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
    const dropdownToggle = document.getElementById('dropdown-toggle');
    if (dropdownToggle) {
      if (this.isDropdownOpen) {
        dropdownToggle.classList.add('active');
      } else {
        dropdownToggle.classList.remove('active');
      }
    }
  }

  isActive(route: string): boolean {
    return this.router.isActive(route, true);
  }

  logout() {
    this.authService.encerrarSessao();
    this.router.navigate(['/login']);
  }

  getInitial(name: string): string {
    return name ? name.charAt(0).toUpperCase() : '?';
  }

  getRandomColor(seed: string): string {
    const colors = [
      '#FFB3BA', // Rosa pastel
      '#FFDFBA', // Laranja pastel
      '#BAFFC9', // Verde pastel
      '#BAE1FF', // Azul pastel
      '#D5BAFF', // Roxo pastel
    ];
    const index = seed ? seed.charCodeAt(0) % colors.length : 0;
    return colors[index];
  }

  private carregarPerfilUsuario(): void {
    this.authService.obterPerfilUsuario().subscribe({
      next: (response: Usuario) => {
        console.log('Perfil do usuário:', response);
        this.nomeUsuario = response.nome;
        const permissao = response.permissao;
        this.permissaoUsuario =
          this.permissaoDescricao[permissao] || 'Permissão desconhecida';
      },
      error: (err: any) => {
        console.error('Erro ao buscar perfil do usuário', err);
      },
    });
  }

  openModalLogout(): void {
    this.modalConfirmacaoService.openModal(
      {
        title: 'Sair da Plataforma',
        description: `Tem certeza que deseja sair da plataforma <strong>Kira</strong>? Você será redirecionado para a tela de login.`,
        confirmTextoBotao: 'Sair',
        size: 'md',
      },
      () => {
        this.logout();
      }
    );
  }
}
