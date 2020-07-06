import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { CardModel } from './card.model';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CardstoreService {
  // tslint:disable-next-line: variable-name
  private _favoriteCardSubject = new BehaviorSubject({});
  // {cardID: 123, card: {card data itsel}}
  // remember you can add dynamic keys to object

  constructor(private storage: Storage) {
    this.loadInitialData();
   }

   get favoriteCardSubject() {
    return this._favoriteCardSubject.asObservable();
   }

  private loadInitialData() {
    this.storage.get('favoriteCards').then((favCards) => {
      this._favoriteCardSubject.next(favCards || {});
    });
  }

  public toggleCard(card: CardModel) {
    const favoriteCards = this._favoriteCardSubject.getValue();
    if (card.favorite) {
      card.favorite = false;
      delete favoriteCards[card.cardId];
    } else {
      card.favorite = true;
      favoriteCards[card.cardId] = card;
    }
    console.log(favoriteCards);
    this.storage.set('favoriteCards', favoriteCards).then((done) => {
      this._favoriteCardSubject.next(favoriteCards);
    });
  }
}
