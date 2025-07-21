import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingMessagesService {
  private loadingMessages: string[] = [
    'As melhores escolhas você faz conosco',
    'Encontrando o imóvel perfeito para você',
    'Preparando experiências incríveis',
    'Conectando sonhos e realidades',
    'Seu novo lar está quase aqui',
    'Organizando as melhores opções',
    'Criando momentos especiais',
    'Buscando oportunidades únicas',
    'Transformando sonhos em endereços',
    'Construindo seu futuro',
    'Descobrindo possibilidades',
    'Preparando sua nova jornada',
    'Conectando você ao lugar ideal',
    'Criando laços que importam',
    'Seu próximo capítulo começa aqui',
    'Encontrando onde você pertence',
    'Preparando surpresas especiais',
    'Organizando detalhes importantes',
    'Conectando histórias e lugares',
    'Criando memórias que durarão para sempre',
  ];

  constructor() {}

  getRandomMessage(): string {
    const randomIndex = Math.floor(Math.random() * this.loadingMessages.length);
    return this.loadingMessages[randomIndex];
  }

  getAllMessages(): string[] {
    return this.loadingMessages;
  }
}
