import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SistemaRoutingModule } from './sistema-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InicioLocadorComponent } from './dashboard/inicio-locador/inicio-locador.component';
import { InicioLocatarioComponent } from './dashboard/inicio-locatario/inicio-locatario.component';

@NgModule({
  declarations: [
    InicioLocadorComponent,
    InicioLocatarioComponent
  ],
  imports: [
    CommonModule, 
    SistemaRoutingModule, 
    FormsModule, 
  ],
})
export class SistemaModule {}
