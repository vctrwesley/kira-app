import {
  Component,
  ViewChild,
  ViewContainerRef,
  AfterViewInit,
} from '@angular/core';
import { ModalDeleteService } from './services/modals/modal-delete.service';
import { ModalConfirmacaoService } from './services/modals/modal-confirmacao.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'kira-app';

  @ViewChild('modalOutlet', { read: ViewContainerRef, static: true })
  modalOutlet!: ViewContainerRef;

  constructor(
    private modalDeleteService: ModalDeleteService,
    private modalConfirmacaoService: ModalConfirmacaoService
  ) {}

  ngAfterViewInit(): void {
    this.modalDeleteService.registerOutlet(this.modalOutlet);
    this.modalConfirmacaoService.registerOutlet(this.modalOutlet);
  }
}
