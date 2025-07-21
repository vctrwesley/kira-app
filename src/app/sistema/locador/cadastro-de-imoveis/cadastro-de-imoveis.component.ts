import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
} from '@angular/forms';
import { Imovel } from '../models/imovel';
import { Endereco } from '../models/endereco';
import { ImovelService } from '../../../services/locador/imovel.service';
import {
  EnderecoService,
  Estado,
} from '../../../services/locador/endereco.service';
import { TipoImovel } from '../enums/tipo-imovel';
import { tipoImovelDescricao } from '../enums/tipo-imovel-descricao';
import { AuthService } from '../../../services/config/auth.service';

@Component({
  selector: 'app-cadastro-de-imoveis',
  templateUrl: './cadastro-de-imoveis.component.html',
  styleUrl: './cadastro-de-imoveis.component.css',
})
export class CadastroDeImoveisComponent implements OnInit {
  imovelForm: FormGroup;
  isLoading = false;
  successMessage: string | null = null;
  errorMessage: string | null = null;
  isEditMode = false;
  lojaId: string | null = null;

  estados: { value: string; description: string }[] = [];
  selectedEstado: string = '';
  cidades: { value: string; description: string }[] = [];
  selectedCidade: string = '';
  tipos = Object.keys(TipoImovel).map((key) => ({
    value: TipoImovel[key as keyof typeof TipoImovel],
    description:
      tipoImovelDescricao[TipoImovel[key as keyof typeof TipoImovel]],
  }));
  selectedTipo: string = '';

  constructor(
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private imovelService: ImovelService,
    private enderecoService: EnderecoService,
    private authService: AuthService
  ) {
    this.imovelForm = this.fb.group({
      titulo: ['', Validators.required],
      endereco: this.fb.group({
        pais: ['Brasil'],
        estado: ['', Validators.required],
        cidade: ['', Validators.required],
        cep: ['', Validators.required],
        bairro: ['', Validators.required],
        rua: ['', Validators.required],
        numero: ['', Validators.required],
        logradouro: [''],
        complemento: [''],
      }),
      descricao: [''],
      locadorId: [null],
      mobiliado: [true, Validators.required],
      numQuartos: [0],
      preco: [0, [Validators.required, Validators.min(0)]],
      tipo: ['', Validators.required],
      area: [0, [Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    this.verificarModoEdicao();
    this.carregarEstadosECidades();
    this.preencherLocadorId();
  }

  goBack(): void {
    this.location.back();
  }

  onEstadoChange(nome: string): void {
    const cidadeControl = this.imovelForm.get('endereco.cidade');

    console.log('onEstadoChange chamado com o estado:', nome);
    this.imovelForm.get('endereco.estado')?.setValue(nome);

    if (!nome) {
      cidadeControl?.disable();
      this.enderecoService.getTodasCidades().subscribe((cidades) => {
        this.cidades = cidades.map((cidade) => ({
          value: cidade.nome,
          description: cidade.nome,
        }));
        this.selectedCidade = '';
        cidadeControl?.setValue(null);
      });
    } else {
      cidadeControl?.enable();
      this.enderecoService.getCidadesByEstado(nome).subscribe((cidades) => {
        console.log('Cidades filtradas pelo estado:', cidades);
        this.cidades = cidades.map((cidade) => ({
          value: cidade.nome,
          description: cidade.nome,
        }));
        this.selectedCidade = '';
        cidadeControl?.setValue(null);
      });
    }
  }

  onCidadeChange(nome: string): void {
    console.log('onCidadeChange chamado com a cidade:', nome);
    this.imovelForm.get('endereco.cidade')?.setValue(nome);
  }

  onSubmit(): void {
    if (this.imovelForm.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos obrigatórios.';
      return;
    }

    const endereco: Endereco = this.imovelForm.get('endereco')
      ?.value as Endereco;
    console.log('Endereço:', endereco);

    const currentLocadorId = this.imovelForm.get('locadorId')?.value;
    if (!currentLocadorId) {
      this.errorMessage =
        'Erro: usuário não identificado. Recarregue a página.';
      return;
    }

    const imovel: Imovel = {
      ...this.imovelForm.value,
      endereco: endereco,
    };

    this.isLoading = true;
    this.successMessage = null;
    this.errorMessage = null;

    console.log('Dados do imóvel:', imovel);
    console.log('Dados enviados para o backend:', imovel);

    if (this.isEditMode && this.lojaId) {
      this.imovelService.atualizarImovel(this.lojaId, imovel).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Imóvel atualizado com sucesso!';
          this.errorMessage = null;
          this.router.navigate(['/usuario/meus-imoveis'], {
            state: { successMessage: 'Imóvel atualizado com sucesso!' },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao atualizar o imóvel.';
          this.successMessage = null;
        }
      );
    } else {
      this.imovelService.cadastrarImovel(imovel).subscribe(
        (response) => {
          this.isLoading = false;
          this.successMessage = 'Imóvel cadastrado com sucesso!';
          this.errorMessage = null;
          this.imovelForm.reset();
          this.router.navigate(['/usuario/meus-imoveis'], {
            state: { successMessage: 'Imóvel cadastrado com sucesso!' },
          });
        },
        (error) => {
          this.isLoading = false;
          this.errorMessage = error.message || 'Erro ao cadastrar o imóvel.';
          this.successMessage = null;
        }
      );
    }
  }

  isRequired(controlName: string): boolean {
    const control = this.imovelForm.get(controlName);
    if (control && control.validator) {
      const validator = control.validator({} as AbstractControl);
      return !!(validator && validator['required']);
    }
    return false;
  }

  private verificarModoEdicao(): void {
    this.lojaId = this.route.snapshot.paramMap.get('id');
    if (this.lojaId) {
      this.isEditMode = true;
      this.imovelService.getImovelById(Number(this.lojaId)).subscribe(
        (imovel: Imovel) => {
          console.log('Dados do imóvel recebidos:', imovel);

          const estado = imovel.endereco.estado;
          const cidade = imovel.endereco.cidade;

          this.imovelForm.patchValue(imovel);
          this.onEstadoChange(estado);
          this.selectedEstado = estado;
          this.tratarRetornoDTO(imovel);

          this.enderecoService
            .getCidadesByEstado(estado)
            .subscribe((cidades) => {
              this.cidades = cidades.map((cidade) => ({
                value: cidade.nome,
                description: cidade.nome,
              }));
              this.selectedCidade = cidade;
              this.imovelForm.get('endereco.cidade')?.setValue(cidade);
            });
        },
        (error) => {
          console.error('Erro ao carregar os dados do imóvel:', error);
        }
      );
    }
  }

  private carregarEstadosECidades(): void {
    this.enderecoService.getEstados().subscribe((estados: Estado[]) => {
      this.estados = estados.map((estado: Estado) => ({
        value: estado.sigla,
        description: estado.nome,
      }));
      console.log('Estados carregados:', this.estados);
    });

    this.onEstadoChange('');
  }

  private tratarRetornoDTO(imovel: Imovel): void {}

  private preencherLocadorId(): void {
    this.authService.obterPerfilUsuario().subscribe({
      next: (usuario) => {
        console.log('Perfil do usuário obtido:', usuario);

        if (usuario && usuario.id) {
          const locadorId =
            typeof usuario.id === 'string'
              ? parseInt(usuario.id, 10)
              : usuario.id;

          this.imovelForm.get('locadorId')?.setValue(locadorId);
          console.log('LocadorId preenchido via API:', locadorId);
        } else {
          console.error('Usuario obtido mas sem ID');
          this.errorMessage =
            'Erro: não foi possível identificar o usuário. Faça login novamente.';
        }
      },
      error: (error) => {
        console.error('Erro ao obter perfil do usuário via API:', error);
        this.errorMessage =
          'Erro: falha na autenticação. Faça login novamente.';
      },
    });
  }
}
