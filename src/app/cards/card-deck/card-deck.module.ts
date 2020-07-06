import { CardListComponent } from './../components/card-list/card-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CardDeckPageRoutingModule } from './card-deck-routing.module';

import { CardDeckPage } from './card-deck.page';
import { ExploreContainerComponentModule } from 'src/app/explore-container/explore-container.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExploreContainerComponentModule,
    CardDeckPageRoutingModule,
  ],
  declarations: [CardDeckPage, CardListComponent],
})
export class CardDeckPageModule {}
