import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'card-deck',
        loadChildren: () =>
          import('../cards/card-deck/card-deck.module').then(
            (m) => m.CardDeckPageModule
          ),
      },
      {
        path: 'card-listing',
        loadChildren: () =>
          import('../cards/card-listing/card-listing.module').then(
            (m) => m.CardListingPageModule
          ),
      },
      {
        path: 'card-detail',
        loadChildren: () =>
          import('../cards/card-detail/card-detail.module').then(
            (m) => m.CardDetailPageModule
          ),
      },
      {
        path: 'favorite-card',
        loadChildren: () =>
          import('../cards/favorite-card/favorite-card.module').then(
            (m) => m.FavoriteCardPageModule
          ),
      },
      {
        path: 'tab2',
        loadChildren: () =>
          import('../tab2/tab2.module').then((m) => m.Tab2PageModule),
      },
      {
        path: 'tab3',
        loadChildren: () =>
          import('../tab3/tab3.module').then((m) => m.Tab3PageModule),
      },
      {
        path: '**',
        redirectTo: '/tabs/card-deck',
        pathMatch: 'full',
      },
    ],
  },
  // {
  //   path: '',
  //   redirectTo: '/tabs/card-deck',
  //   pathMatch: 'full'
  // },
  {
    path: '**',
    redirectTo: '/tabs/card-deck',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
