import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CardDeckPage } from './card-deck.page';

const routes: Routes = [
  {
    path: '',
    component: CardDeckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CardDeckPageRoutingModule {}
