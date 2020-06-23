import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ClientesPendientesPage } from './clientes-pendientes.page';

describe('ClientesPendientesPage', () => {
  let component: ClientesPendientesPage;
  let fixture: ComponentFixture<ClientesPendientesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientesPendientesPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ClientesPendientesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
