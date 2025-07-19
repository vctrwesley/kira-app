import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarAnuncioComponent } from './visualizar-anuncio.component';

describe('VisualizarAnuncioComponent', () => {
  let component: VisualizarAnuncioComponent;
  let fixture: ComponentFixture<VisualizarAnuncioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VisualizarAnuncioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarAnuncioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
