import { Permissao } from "./permissao";

export class Usuario {
  id!: number;
  username!: string;
  permissao!: Permissao;
  password!: string;
}
