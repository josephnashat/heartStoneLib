import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FavoriteCardPageRoutingModule } from './favorite-card-routing.module';

import { FavoriteCardPage } from './favorite-card.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FavoriteCardPageRoutingModule
  ],
  declarations: [FavoriteCardPage]
})
export class FavoriteCardPageModule {}
