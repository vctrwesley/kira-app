import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/config/auth.service';
import { Usuario } from '../../login/models/usuario';
import { Permissao } from '../../login/models/permissao';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { UsuarioService } from '../../services/config/usuario.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css',
})
export class CadastroComponent implements OnInit {
  usuarioForm: FormGroup;
  mensagemSucesso: string = '';
  errors: string[] = [];
  showForgotPassword: boolean = false;
  usuario!: Usuario | null;
  passwordVisible: { [key: string]: boolean } = {
    password: false,
    confirmPassword: false,
  };

  loading = true;
  isLoading: boolean = false;

  LOCATARIO = "LOCATARIO";
  LOCADOR = "LOCADOR";

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) {
    this.usuarioForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]],
      permissao: ["LOCATARIO", [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      documento: ['', [Validators.required]],
      aceitarTermos: [false, [Validators.requiredTrue]],
    });
  }

  ngOnInit() {
    setTimeout(() => {
      this.loading = false;
    }, 2000);
  }

  onSubmit() {
    if (this.usuarioForm.valid) {
      const { aceitarTermos, ...dadosParaEnvio } =
        this.usuarioForm.value;

      console.log('Dados para envio ao backend:', dadosParaEnvio);

      this.isLoading = true;
      this.mensagemSucesso = '';
      this.errors = [];

      // Usar UsuarioService em vez de AuthService
      this.usuarioService.cadastrarUsuario(dadosParaEnvio).subscribe({
        next: (response) => {
          this.isLoading = false;
          this.mensagemSucesso =
            'Usuário cadastrado com sucesso! Redirecionando para o login...';
          this.errors = [];

          setTimeout(() => {
            this.router.navigate(['/login'], {
              state: {
                successMessage:
                  'Cadastro realizado com sucesso! Faça seu login.',
                email: dadosParaEnvio.email,
              },
            });
          }, 2000);
        },
        error: (error) => {
          this.isLoading = false;
          this.mensagemSucesso = '';
          this.errors = [error.message || 'Erro ao cadastrar usuário.'];
          console.error('❌ Erro no cadastro:', error);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
      });
    } else {
      console.log('Formulário inválido');
      Object.keys(this.usuarioForm.controls).forEach((key) => {
        this.usuarioForm.get(key)?.markAsTouched();
      });
      this.errors = ['Por favor, preencha todos os campos obrigatórios.'];
    }
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
