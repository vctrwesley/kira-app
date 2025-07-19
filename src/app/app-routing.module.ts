import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { InicioLocadorComponent } from './sistema/dashboard/inicio-locador/inicio-locador.component';
import { InicioLocatarioComponent } from './sistema/dashboard/inicio-locatario/inicio-locatario.component';
import { AuthGuard } from './services/config/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard-locador',
        component: InicioLocadorComponent,
        // canActivate: [AuthGuard],
      },
      {
        path: 'inicio',
        component: InicioLocatarioComponent,
        // canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
