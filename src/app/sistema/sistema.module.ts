import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaRoutingModule } from './sistema-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioLocadorComponent } from './dashboard/inicio-locador/inicio-locador.component';
import { InicioLocatarioComponent } from './dashboard/inicio-locatario/inicio-locatario.component';
import { CadastroDeImoveisComponent } from './locador/cadastro-de-imoveis/cadastro-de-imoveis.component';
import { MeusImoveisComponent } from './locador/meus-imoveis/meus-imoveis.component';
import { VisualizarImovelComponent } from './locador/visualizar-imovel/visualizar-imovel.component';
import { VisualizarAnuncioComponent } from './locatario/visualizar-anuncio/visualizar-anuncio.component';
import { FavoritosComponent } from './locatario/favoritos/favoritos.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { SuporteComponent } from './suporte/suporte.component';

@NgModule({
  declarations: [
    InicioLocadorComponent,
    InicioLocatarioComponent,
    CadastroDeImoveisComponent,
    MeusImoveisComponent,
    VisualizarImovelComponent,
    VisualizarAnuncioComponent,
    FavoritosComponent,
    MinhaContaComponent,
    SuporteComponent
  ],
  imports: [
    CommonModule, 
    SistemaRoutingModule, 
    FormsModule, 
  ],
})
export class SistemaModule {}
