import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeConversasComponent } from './lista-de-conversas.component';

describe('ListaDeConversasComponent', () => {
  let component: ListaDeConversasComponent;
  let fixture: ComponentFixture<ListaDeConversasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDeConversasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeConversasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
