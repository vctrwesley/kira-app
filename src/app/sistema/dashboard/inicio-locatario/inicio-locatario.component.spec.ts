import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioLocatarioComponent } from './inicio-locatario.component';

describe('InicioLocatarioComponent', () => {
  let component: InicioLocatarioComponent;
  let fixture: ComponentFixture<InicioLocatarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InicioLocatarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioLocatarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
