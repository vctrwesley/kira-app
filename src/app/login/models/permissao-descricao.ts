import { Permissao } from './permissao';

export const PermissaoDescricoes: Record<Permissao, string> = {
  [Permissao.ADMIN]: 'ADMIN',
  [Permissao.LOCADOR]: 'LOCADOR',
  [Permissao.LOCATARIO]: 'LOCATARIO',
};
