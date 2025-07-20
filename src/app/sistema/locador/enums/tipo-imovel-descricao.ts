import { TipoImovel } from './tipo-imovel';

export const tipoImovelDescricao: { [key in TipoImovel]: string } = {
  [TipoImovel.CASA]: 'Casa',
  [TipoImovel.APARTAMENTO]: 'Apartamento',
  [TipoImovel.QUARTO]: 'Quarto',
};
