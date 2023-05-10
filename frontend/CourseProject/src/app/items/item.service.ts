import {Item} from "../shared/item.model";
import {EventEmitter} from "@angular/core";

export class ItemService {
  itemSelected = new EventEmitter<Item>();

  private items: Item[] = [
    new Item(
      1,
      'Tasty Schnitzel',
      10,
      '1385 washington avenue',
      'cheese hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ['fast food']),
    new Item(
      1,
      'Tasty Schnitzel',
      10,
      '1385 washington avenue',
      'cheese hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ['fast food']),
    new Item(
      1,
      'Tasty Schnitzel',
      10,
      '1385 washington avenue',
      'cheese hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ['fast food']),
    new Item(
      1,
      'Tasty Schnitzel',
      10,
      '1385 washington avenue',
      'cheese hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ['fast food']),
    new Item(
      1,
      'Tasty Schnitzel',
      10,
      '1385 washington avenue',
      'cheese hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ['fast food']),
    new Item(
      1,
      'Tasty Schnitzel',
      10,
      '1385 washington avenue',
      'cheese hamburgercheese hamburgercheese hamburgercheese hamburgercheese hamburgercheese hamburgercheese hamburgercheese hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ['fast food']),
    new Item(
      1,
      'Tasty Schnitzel',
      20,
      '1385 washington avenue',
      'cheese hamburger',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ['fast food'])
    ]

  getItems() {
    return this.items.slice();
  }


}
