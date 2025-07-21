import { Component, Input, OnInit } from '@angular/core';
import { LoadingMessagesService } from '../../../services/loading-messages.service';

@Component({
  selector: 'app-tela-carregamento',
  templateUrl: './tela-carregamento.component.html',
  styleUrl: './tela-carregamento.component.css',
})
export class TelaCarregamentoComponent implements OnInit {
  @Input() isVisible: boolean = true;
  @Input() duration: number = 2000;

  currentMessage: string = '';

  constructor(private loadingMessagesService: LoadingMessagesService) {}

  ngOnInit() {
    this.currentMessage = this.loadingMessagesService.getRandomMessage();
  }
}
