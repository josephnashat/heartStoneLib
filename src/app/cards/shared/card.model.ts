export interface CardModel {
    cardId: string;
    dbfId: string;
    name: string;
    cardSet: string;
    type: string;
    health: number;
    text: string;
    playerClass: string;
    img: string;
    imgGold: string;
    locale: string;
    rarity: string;
    collectible?: boolean;
    elite?: boolean;
    classes: string[];
    artist: string;
    faction: string;
    attack?: number;
    race: string;
    cost?: number;
    durability?: number;
    flavor: string;
    howToGet: string;
    howToGetGold: string;
    armor: string;
    favorite: boolean;
}
