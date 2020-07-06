import { CardstoreService } from './../shared/cardstore.service';
import { CardModel } from './../shared/card.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-favorite-card',
  templateUrl: './favorite-card.page.html',
  styleUrls: ['./favorite-card.page.scss'],
})
export class FavoriteCardPage implements OnInit {
  favoriteCards: CardModel[] = [];
  constructor(private favCardSrv: CardstoreService) {}

  ngOnInit() {
    this.favCardSrv.favoriteCardSubject.subscribe((favCard: {}) => {
      this.favoriteCards = [];
      for (const key in favCard) {
        if (favCard[key]) {
          this.favoriteCards.push(favCard[key]);
        }
      }
    });
  }

  toggleCard(card: CardModel) {
    this.favCardSrv.toggleCard(card);
  }
}
