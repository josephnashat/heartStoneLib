import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavoriteCardPage } from './favorite-card.page';

describe('FavoriteCardPage', () => {
  let component: FavoriteCardPage;
  let fixture: ComponentFixture<FavoriteCardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavoriteCardPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoriteCardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
