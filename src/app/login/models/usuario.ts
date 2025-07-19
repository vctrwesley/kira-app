import { Permissao } from './permissao';

export class Usuario {
  id!: string;
  username!: string;
  nome!: string;
  permissao!: Permissao;
  password!: string;
  confirmPassword!: string;
  email!: string;
  darkMode!: boolean;
}
