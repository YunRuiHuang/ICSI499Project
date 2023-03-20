export class Item {
  itemID: number
  itemName: string
  itemPrice: number;
  itemLocation: string;
  itemDescription: string
  itemImageURL: string;

  itemKeywords: string[];


  constructor(itemID: number, itemName: string, itemPrice: number, itemLocation: string, itemDescription: string, itemImageURL: string, itemKeywords: string[]) {
    this.itemID = itemID;
    this.itemName = itemName;
    this.itemPrice = itemPrice;
    this.itemLocation = itemLocation;
    this.itemDescription = itemDescription;
    this.itemImageURL = itemImageURL;
    this.itemKeywords = itemKeywords;
  }
}
