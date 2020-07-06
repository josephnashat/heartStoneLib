import { LoaderService } from './../shared/loader.service';
import { CardDeckModel } from '../shared/carddeck.model';
import { CardService } from '../shared/card.service';
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { ToasterService } from '../shared/toaster.service';

@Component({
  selector: 'app-card-deck',
  templateUrl: './card-deck.page.html',
  styleUrls: ['./card-deck.page.scss'],
})
export class CardDeckPage implements OnInit {
  public cardDecks: CardDeckModel[] = [];
  constructor(
    private cardService: CardService,
    private loaderService: LoaderService,
    private toaster: ToasterService
  ) {
  }
  logger(val1, val2) {
    console.log(val1, val2);
  }
  async ngOnInit() {
    await this.loaderService.presentLoader('Loading');
    this.cardService.getAllCards().subscribe((cards) => {
      this.cardDecks = cards;
      console.log(this.cardDecks);
      this.loaderService.dismissLoader();
    }, err => {
      this.loaderService.dismissLoader();
      this.toaster.presentToast('Oops error ' + err.message);
    });
  }
}
