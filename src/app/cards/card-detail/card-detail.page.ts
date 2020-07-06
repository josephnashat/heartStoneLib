import { ToasterService } from './../shared/toaster.service';
import { LoaderService } from './../shared/loader.service';
import { CardModel } from './../shared/card.model';
import { CardService } from './../shared/card.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-card-detail',
  templateUrl: './card-detail.page.html',
  styleUrls: ['./card-detail.page.scss'],
})
export class CardDetailPage implements OnInit {
  cardDeckGroup: string;
  cardDeck: string;
  cardId: string;
  card: CardModel;
  constructor(
    private route: ActivatedRoute,
    private cardService: CardService,
    private loaderService: LoaderService,
    private toaster: ToasterService
  ) {}

  async ngOnInit() {
    this.cardDeckGroup = this.route.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.route.snapshot.paramMap.get('cardDeck');
    this.cardId = this.route.snapshot.paramMap.get('cardId');
    this.route.paramMap.subscribe((data: Params) => {
      this.cardDeckGroup = data.params.cardDeckGroup;
      this.cardDeck = data.params.cardDeck;
      this.cardId = data.params.cardId;
    });
    await this.loaderService.presentLoader('Loading');
    this.cardService.getCardById(this.cardId).subscribe((cardsData) => {
      this.card = cardsData[0];
      this.loaderService.dismissLoader();
    }, err => {
      this.loaderService.dismissLoader();
      this.toaster.presentToast('Oops error ' + err.message);
    });
  }

  errorFallback(event) {
    if (this.card) {
      this.card.img = '/assets/images/DefaultCard.png';
    }
  }
}
