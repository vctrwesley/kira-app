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

  onSubmit() {}

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
