import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FavoriteCardPage } from './favorite-card.page';
import { CardDetailPage } from '../card-detail/card-detail.page';

const routes: Routes = [
  {
    path: '',
    component: FavoriteCardPage
  },
  {
    path: ':cardId',
    component: CardDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FavoriteCardPageRoutingModule {}
