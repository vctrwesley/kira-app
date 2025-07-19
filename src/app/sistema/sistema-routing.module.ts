import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from '../layout/layout.component';
import { AuthGuard } from '../services/config/auth.guard';
import { InicioLocadorComponent } from './dashboard/inicio-locador/inicio-locador.component';
import { InicioLocatarioComponent } from './dashboard/inicio-locatario/inicio-locatario.component';

const routes: Routes = [
   {  path: 'usuario', 
    component: LayoutComponent,
    // canActivate: [AuthGuard],  
    children: [

    {path:'dashboard-locador', component: InicioLocadorComponent}, //locador
    {path:'inicio', component: InicioLocatarioComponent}, //locatario
    ] 
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SistemaRoutingModule {}
