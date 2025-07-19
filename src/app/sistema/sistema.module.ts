import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaRoutingModule } from './sistema-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from '../services/config/auth.service';
import { TokenInterceptor } from '../services/config/token.interceptor';
import { InicioLocadorComponent } from './dashboard/inicio-locador/inicio-locador.component';
import { InicioLocatarioComponent } from './dashboard/inicio-locatario/inicio-locatario.component';
import { CadastroDeImoveisComponent } from './locador/cadastro-de-imoveis/cadastro-de-imoveis.component';
import { MeusImoveisComponent } from './locador/meus-imoveis/meus-imoveis.component';
import { VisualizarImovelComponent } from './locador/visualizar-imovel/visualizar-imovel.component';
import { VisualizarAnuncioComponent } from './locatario/visualizar-anuncio/visualizar-anuncio.component';
import { FavoritosComponent } from './locatario/favoritos/favoritos.component';
import { MinhaContaComponent } from './minha-conta/minha-conta.component';
import { SuporteComponent } from './suporte/suporte.component';
import { ChatComponent } from './comunicacao/chat/chat.component';
import { ListaDeConversasComponent } from './comunicacao/lista-de-conversas/lista-de-conversas.component';
import { SharedModule } from '../shared/shared.module';
import { NgxMaskModule, IConfig } from 'ngx-mask';

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
    SuporteComponent,
    ChatComponent,
    ListaDeConversasComponent,
  ],
  imports: [
    CommonModule,
    SistemaRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
  ],
})
export class SistemaModule {}
