import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PaginationComponent } from './pagination/pagination.component';
import { SelectPadraoComponent } from './select-padrao/select-padrao.component';
import { SearchComponent } from './search/search.component';
import { TelaCarregamentoComponent } from './animacoes/tela-carregamento/tela-carregamento.component';
import { LoadingSpinnerComponent } from './animacoes/loading-spinner/loading-spinner.component';



@NgModule({
  declarations: [
    PaginationComponent,
    SelectPadraoComponent,
    SearchComponent,
    TelaCarregamentoComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    PaginationComponent,
    SelectPadraoComponent,
    SearchComponent,
    TelaCarregamentoComponent
  ]
})
export class SharedModule { }
