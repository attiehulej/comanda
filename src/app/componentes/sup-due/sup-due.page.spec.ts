import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SupDuePage } from './sup-due.page';

describe('SupDuePage', () => {
  let component: SupDuePage;
  let fixture: ComponentFixture<SupDuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupDuePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SupDuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
