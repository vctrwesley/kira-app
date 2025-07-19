import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../services/config/auth.guard';
import { InicioLocadorComponent } from './dashboard/inicio-locador/inicio-locador.component';
import { InicioLocatarioComponent } from './dashboard/inicio-locatario/inicio-locatario.component';
import { CadastroDeImoveisComponent } from './locador/cadastro-de-imoveis/cadastro-de-imoveis.component';
import { MeusImoveisComponent } from './locador/meus-imoveis/meus-imoveis.component';
import { VisualizarImovelComponent } from './locador/visualizar-imovel/visualizar-imovel.component';
import { VisualizarAnuncioComponent } from './locatario/visualizar-anuncio/visualizar-anuncio.component';
import { FavoritosComponent } from './locatario/favoritos/favoritos.component';

const routes: Routes = [
   {  path: 'usuario', 
    component: LayoutComponent,
    // canActivate: [AuthGuard],  
    children: [

    {path:'dashboard-locador', component: InicioLocadorComponent}, //locador
    {path:'inicio', component: InicioLocatarioComponent}, //locatario

    {path:'cadastro-imovel', component: CadastroDeImoveisComponent}, //locador
    {path:'meus-imoveis', component: MeusImoveisComponent}, //locador
    {path:'visualizar-imovel/:id', component: VisualizarImovelComponent}, //locador
    {path:'visualizar-anuncio/:id', component: VisualizarAnuncioComponent}, //locatario
    {path:'favoritos', component: FavoritosComponent}, //locatario
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaRoutingModule {}
