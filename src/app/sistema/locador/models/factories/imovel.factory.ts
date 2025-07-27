import { Imovel } from '../imovel';
import { TipoImovel } from '../../enums/tipo-imovel';

export class ImovelFactory {
  static criar(data: any): Imovel {
    const imovel = new Imovel();
    imovel.id = data.id;
    imovel.titulo = data.titulo;
    imovel.descricao = data.descricao;
    imovel.preco = data.preco;
    imovel.tipo = data.tipo as TipoImovel;
    imovel.endereco = data.endereco;
    imovel.locadorId = data.locadorId;
    imovel.mobiliado = data.mobiliado;
    imovel.numQuartos = data.numQuartos;
    imovel.area = data.area;
    imovel.fotos = data.fotos ?? [];

    return imovel;
  }
}
