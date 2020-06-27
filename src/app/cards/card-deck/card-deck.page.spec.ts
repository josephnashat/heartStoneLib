import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CardDeckPage } from './card-deck.page';

describe('CardDeckPage', () => {
  let component: CardDeckPage;
  let fixture: ComponentFixture<CardDeckPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardDeckPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CardDeckPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
