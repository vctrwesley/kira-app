import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateModule } from './template/template.module';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SistemaModule } from './sistema/sistema.module';
import { SharedModule } from './shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthService } from './services/config/auth.service';
import { TokenInterceptor } from './services/config/token.interceptor';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CadastroComponent } from './autenticacao/cadastro/cadastro.component';
import { EsqueciSenhaComponent } from './autenticacao/esqueci-senha/esqueci-senha.component';
import { ResetPasswordComponent } from './autenticacao/reset-password/reset-password.component';
import { NgxMaskModule, IConfig } from 'ngx-mask';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    CadastroComponent,
    EsqueciSenhaComponent,
    ResetPasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TemplateModule,
    SistemaModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
