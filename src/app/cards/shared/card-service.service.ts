import { Injectable } from '@angular/core';
import { of, scheduled, asyncScheduler } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardServiceService {
  private readonly cardDecks: string[] = [
    'Alliance',
    'Beast',
    'Common',
    'Death Knight',
    'Demon',
    'Dragon',
    'Dream',
    'Druid',
    'Elemental',
    'Enchantment',
    'Epic',
    'Free',
    'Hero',
    'Hero Power',
    'Horde',
    'Hunter',
    'Legendary',
    'Mage',
    'Mech',
    'Minion',
    'Murloc',
    'Neutral',
    'Paladin',
    'Pirate',
    'Priest',
    'Rare',
    'Rogue',
    'Shaman',
    'Spell',
    'Totem',
    'Warlock',
    'Warrior',
    'Weapon',
  ];

  getAllCards() {
    // of is a nice operator used to transform any datatype to observable
    // similar operator is from, from(this.cardDecks) will send data 1 by 1 not like of which passes the whole data
    // scheduled == from effect, scheduler (asyncScheduler, queueScheduler, asapScheduler)
     return of(this.cardDecks);
  }
  constructor() {}
}
