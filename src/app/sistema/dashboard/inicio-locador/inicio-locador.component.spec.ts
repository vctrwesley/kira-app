import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioLocadorComponent } from './inicio-locador.component';

describe('InicioLocadorComponent', () => {
  let component: InicioLocadorComponent;
  let fixture: ComponentFixture<InicioLocadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioLocadorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioLocadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
