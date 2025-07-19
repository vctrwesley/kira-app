import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/config/auth.service';
import { Usuario } from './models/usuario';
import { Permissao } from './models/permissao';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';
  mensagemSucesso: string = '';
  errors: string[] = [];
  showForgotPassword: boolean = false;
  usuario!: Usuario | null;
  passwordVisible: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };

  loading = true;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  onSubmit() {
    this.authService.tentarLogar(this.email, this.password).subscribe(
      (response: any) => {
        const access_token = response.access_token;
        localStorage.setItem('access_token', access_token);

        const userId = this.authService.getUserIdFromToken() ?? '';
        localStorage.setItem('user_id', userId || '');

        const usuario: Usuario = {
          id: userId,
          username: response.username,
          password: '',
          email: response.email || '',
          confirmPassword: '',
          permissao:
            response.authorities.length > 0 ? response.authorities[0] : null,
          darkMode: response.darkMode || false,
        };
        localStorage.setItem('usuario', JSON.stringify(usuario));

        switch (usuario.permissao) {
          case Permissao.ADMIN:
            this.router.navigate(['/usuario/dashboard-locador']);
            break;
          case Permissao.LOCADOR:
            this.router.navigate(['/usuario/dashboard-locador']);
            break;
          case Permissao.LOCATARIO:
            this.router.navigate(['/usuario/inicio']);
            break;
          default:
            this.router.navigate(['/login']);
            break;
        }
      },
      (errorResponse) => {
        this.errors = ['Usuário e/ou senha incorreto(s).'];
      }
    );
  }

  togglePasswordVisibility(field: string) {
    this.passwordVisible[field] = !this.passwordVisible[field];
    const passwordInput = document.querySelector(`input[name="${field}"]`);
    if (passwordInput) {
      passwordInput.setAttribute(
        'type',
        this.passwordVisible[field] ? 'text' : 'password'
      );
    }
  }
}
