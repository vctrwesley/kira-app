import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { SelectPadraoComponent } from './select-padrao/select-padrao.component';
import { SearchComponent } from './search/search.component';



@NgModule({
  declarations: [
    PaginationComponent,
    SelectPadraoComponent,
    SearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PaginationComponent,
    SelectPadraoComponent,
    SearchComponent
  ]
})
export class SharedModule { }
