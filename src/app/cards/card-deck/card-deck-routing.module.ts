import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDeckPage } from './card-deck.page';

const routes: Routes = [
  {
    path: '',
    component: CardDeckPage
  },
  {
    path: ':cardDeckGroup/:cardDeck',
    loadChildren: () =>
    import('../card-listing/card-listing.module').then(
      (m) => m.CardListingPageModule
    )
  },
  {
    path: ':cardDeckGroup/:cardDeck/:cardId',
    loadChildren: () =>
    import('../card-detail/card-detail.module').then(
      (m) => m.CardDetailPageModule
    )
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardDeckPageRoutingModule {}
