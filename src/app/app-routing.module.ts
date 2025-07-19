import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { InicioLocadorComponent } from './sistema/dashboard/inicio-locador/inicio-locador.component';
import { InicioLocatarioComponent } from './sistema/dashboard/inicio-locatario/inicio-locatario.component';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { EsqueciSenhaComponent } from './autenticacao/esqueci-senha/esqueci-senha.component';
import { ResetPasswordComponent } from './autenticacao/reset-password/reset-password.component';
import { AuthGuard } from './services/config/auth.guard';

const routes: Routes = [
  { path: 'cadastro', component: CadastroComponent },
  { path: 'esqueci-senha', component: EsqueciSenhaComponent },
  { path: 'resetar-senha', component: ResetPasswordComponent },
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
