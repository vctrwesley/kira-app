import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarImovelComponent } from './visualizar-imovel.component';

describe('VisualizarImovelComponent', () => {
  let component: VisualizarImovelComponent;
  let fixture: ComponentFixture<VisualizarImovelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarImovelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarImovelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
