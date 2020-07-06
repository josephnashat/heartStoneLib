import { CardstoreService } from './../shared/cardstore.service';
import { ToasterService } from './../shared/toaster.service';
import { LoaderService } from './../shared/loader.service';
import { CardService } from '../shared/card.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { CardModel } from '../shared/card.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-listing',
  templateUrl: './card-listing.page.html',
  styleUrls: ['./card-listing.page.scss'],
})
export class CardListingPage implements OnInit, OnDestroy {
  cardDeckGroup: string;
  cardDeck: string;
  cards: CardModel[];
  cardsCopy: CardModel[];
  isLoading: boolean;
  private cardsSubscription: Subscription;


  constructor(
    private router: ActivatedRoute,
    private cardService: CardService,
    private loaderService: LoaderService,
    private toaster: ToasterService,
    private cardStoreService: CardstoreService
  ) {}

  ngOnDestroy(): void {
    this.cardsSubscription.unsubscribe();
  }

  ionViewDidEnter() {}

  async ngOnInit() {
    this.cardDeckGroup = this.router.snapshot.paramMap.get('cardDeckGroup');
    this.cardDeck = this.router.snapshot.paramMap.get('cardDeck');
    this.router.paramMap.subscribe((data: Params) => {
      this.cardDeckGroup = data.params.cardDeckGroup;
      this.cardDeck = data.params.cardDeck;
    });
    await this.loadCards();
  }

  private async loadCards() {
    await this.loaderService.presentLoader('Loading');
    this.cardsSubscription = this.cardService
      .getCardsByCardDeck(this.cardDeckGroup, this.cardDeck)
      .subscribe(
        (cardsData) => {
          this.cards = cardsData;
          this.cardsCopy = Array.from(this.cards);
          this.loaderService.dismissLoader();
        },
        (err) => {
          this.loaderService.dismissLoader();
          this.toaster.presentToast('Oops error ' + err.message);
        }
      );
  }

  async doRefresh(event) {
    await this.loadCards();
    event.target.complete();
  }

  onSearchCompleted(cards: CardModel[]) {
    this.cards = cards;
    this.isLoading = false;
  }
  onIsSearching() {
    this.isLoading = true;
  }
  favoriteCard(card: CardModel) {
    this.cardStoreService.toggleCard(card);
  }
}
