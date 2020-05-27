import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EmpleadosPage } from './empleados.page';

describe('EmpleadosPage', () => {
  let component: EmpleadosPage;
  let fixture: ComponentFixture<EmpleadosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpleadosPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EmpleadosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
