import { CardServiceService } from './../shared/card-service.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.page.html',
  styleUrls: ['./card-deck.page.scss'],
})
export class CardDeckPage implements OnInit {
  public cardDecks: string[] = [];
  constructor(private cardService: CardServiceService) {
    this.cardService
      .getAllCards()
      .subscribe((cards) => (this.cardDecks = cards));
  }

  ngOnInit() {}
}
