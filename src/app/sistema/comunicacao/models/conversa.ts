export class Conversa {
  id!: number;
  titulo!: string;
  avatarUrl?: string; 
  ultimaMensagem!: string;
  dataUltimaMensagem!: Date;
  lida!: boolean;
  participantes!: string[]; 
  badge?: number;
}
