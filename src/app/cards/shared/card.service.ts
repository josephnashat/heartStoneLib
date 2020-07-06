import { CardstoreService } from './cardstore.service';
import { CardModel } from './card.model';
import { Injectable, OnDestroy } from '@angular/core';
import { of, scheduled, asyncScheduler, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CardDeckModel } from './carddeck.model';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class CardService implements OnDestroy {
  private API_URL = 'https://omgvamp-hearthstone-v1.p.rapidapi.com';
  private API_HEADERS = {
    'x-rapidapi-host': 'omgvamp-hearthstone-v1.p.rapidapi.com',
    'x-rapidapi-key': 'XYw7O5M8zimshQPVlpsrCQ3Mwbfxp1zbeeOjsnCNaWccurXfqm',
  };
  private headers = new HttpHeaders(this.API_HEADERS);
  private readonly allowedDecks = [
    'classes',
    'types',
    'factions',
    'qualities',
    'races',
  ];
  private favoriteCards: any = {};
  private favoriteSubscription: Subscription;
  // private readonly cardDecks: CardDeckModel[];
  constructor(private http: HttpClient, private cardStoreService: CardstoreService) {
    this.favoriteSubscription = this.cardStoreService.favoriteCardSubject.subscribe(
      (favoriteCard) => {
        this.favoriteCards = favoriteCard;
      }
    );
  }
  ngOnDestroy(): void {
    this.favoriteSubscription.unsubscribe();
  }


  getAllCards() {
    // of is a nice operator used to transform any datatype to observable
    // similar operator is from, from(this.cardDecks) will send data 1 by 1 not like of which passes the whole data
    // scheduled == from effect, scheduler (asyncScheduler, queueScheduler, asapScheduler)
    return this.http
      .get<CardDeckModel[]>(`${this.API_URL + '/info'}`, {
        headers: this.headers,
      })
      .pipe(
        map((cards: CardDeckModel[]) => {
          return this.extractAllowedDecks(cards);
        })
      );
    // return of(this.cardDecks);
  }

  getCardsByCardDeck(cardDeckGroup: string, cardDeck: string) {
    return this.http
      .get<CardModel[]>(
        `${this.API_URL + '/cards/' + cardDeckGroup + '/' + cardDeck}`,
        { headers: this.headers }
      )
      .pipe(
        map((cards: CardModel[]) => {
          cards.forEach((card) => {
            card.text = card.text
              ? card.text.replace(/\\n/g, ' ')
              : 'No Description';
            card.favorite = this.favoriteCards[card.cardId] || false;
          });
          return cards;
        })
      );
  }

  getCardById(cardId: string) {
    return this.http
      .get<CardModel[]>(`${this.API_URL + '/cards/' + cardId}`, {
        headers: this.headers,
      })
      .pipe(
        map((cards: CardModel[]) => {
          cards.forEach((card) => {
            card.text = card.text
              ? card.text.replace(/\\n/g, ' ')
              : 'No Description';
          });
          return cards;
        })
      );
  }

  private extractAllowedDecks(cards: CardDeckModel[]) {
    const cardDecks: CardDeckModel[] = [];
    this.allowedDecks.forEach((card) => {
      cardDecks.push({ cardName: card, cardTypes: cards[card] });
    });
    return cardDecks;
  }
}
