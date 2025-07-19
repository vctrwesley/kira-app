import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroDeImoveisComponent } from './cadastro-de-imoveis.component';

describe('CadastroDeImoveisComponent', () => {
  let component: CadastroDeImoveisComponent;
  let fixture: ComponentFixture<CadastroDeImoveisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CadastroDeImoveisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastroDeImoveisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
