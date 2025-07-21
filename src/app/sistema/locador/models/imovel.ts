import { Endereco } from './endereco';
import { TipoImovel } from '../enums/tipo-imovel';

export class Imovel {
  id!: number;
  titulo!: string;
  endereco!: Endereco;
  descricao!: string;
  locadorId!: number;
  mobiliado!: boolean;
  numQuartos!: number;
  preco!: number;
  tipo!: TipoImovel;
  area!: number;
  fotos!: { url: string }[];
}
