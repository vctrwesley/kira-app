import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { SelectPadraoComponent } from './select-padrao/select-padrao.component';
import { SearchComponent } from './search/search.component';
import { TelaCarregamentoComponent } from './animacoes/tela-carregamento/tela-carregamento.component';
import { LoadingSpinnerComponent } from './animacoes/loading-spinner/loading-spinner.component';
import { ModalDeleteComponent } from './modals/modal-delete/modal-delete.component';
import { ModalGeralComponent } from './modals/modal-geral/modal-geral.component';
import { FeedbackComponent } from './feedback/feedback.component';



@NgModule({
  declarations: [
    PaginationComponent,
    SelectPadraoComponent,
    SearchComponent,
    TelaCarregamentoComponent,
    LoadingSpinnerComponent,
    ModalDeleteComponent,
    ModalGeralComponent,
    FeedbackComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PaginationComponent,
    SelectPadraoComponent,
    SearchComponent,
    TelaCarregamentoComponent,
    LoadingSpinnerComponent,
    ModalDeleteComponent,
    ModalGeralComponent,
    FeedbackComponent
  ]
})
export class SharedModule { }
