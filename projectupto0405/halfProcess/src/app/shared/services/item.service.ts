import {Item} from "../item.model";
import {EventEmitter, Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnInit {
  itemSelected = new EventEmitter<Item>();
  private apiUrl = 'http://127.0.0.1:3001/item';
  private item!: Item;

  // private items: Item[] = [
  //   new Item(
  //     1,
  //     2,
  //     'Red Velvet Cake',
  //     29.99,
  //     'Chicago',
  //     'A delicious red velvet cake for any occasion.',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Red_Velvet_Cake_Waldorf_Astoria.jpg/640px-Red_Velvet_Cake_Waldorf_Astoria.jpg',
  //     ['cake', 'red velvet', 'dessert', 'food']
  //   ),
  //   new Item(
  //     2,
  //     3,
  //     'Men\'s Leather Shoes',
  //     119.99,
  //     'Los Angeles',
  //     'High-quality leather shoes for men.',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Mens_brown_derby_leather_shoes.jpg/640px-Mens_brown_derby_leather_shoes.jpg',
  //     ['shoes', 'leather', 'men\'s fashion']
  //   ),
  //   new Item(
  //     3,
  //     4,
  //     'Wireless Bluetooth Speaker',
  //     89.99,
  //     'San Francisco',
  //     'A portable and powerful wireless speaker for your music needs.',
  //     'https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/HP_Roar_Wireless_Speaker.jpg/640px-HP_Roar_Wireless_Speaker.jpg',
  //     ['speaker', 'wireless', 'bluetooth', 'music']
  //   ),
  //   new Item(
  //     4,
  //     10,
  //     'Rose Bouquet',
  //     39.99,
  //     'New York',
  //     'A beautiful bouquet of roses for your loved one.',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ['flowers', 'roses', 'romance']
  //   ),
  //   new Item(
  //     5,
  //     15,
  //     'Wireless Gaming Mouse',
  //     49.99,
  //     'Seattle',
  //     'A high-precision wireless mouse for gaming.',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ['mouse', 'wireless', 'gaming']
  //   ),
  //   new Item(
  //     6,
  //     20,
  //     'Women\'s Leather Wallet',
  //     69.99,
  //     'New York',
  //     'A stylish and practical leather wallet for women.',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ['wallet', 'leather', 'women\'s fashion']
  //   ),
  //   new Item(
  //     7,
  //     30,
  //     'Smart Home Security Camera',
  //     129.99,
  //     'San Francisco',
  //     'A high-definition security camera for your smart home.',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ['security', 'camera', 'smart home']
  //   ),
  //   new Item(
  //     8,
  //     40,
  //     'Bluetooth Earbuds',
  //     39.99,
  //     'Los Angeles',
  //     'Wireless earbuds with great sound quality and noise-cancelling features.',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ['earbuds', 'bluetooth', 'audio', 'music']
  //   ),
  //   new Item(
  //     9,
  //     100,
  //     'Apple iPhone 13 Pro',
  //     999.99,
  //     'San Francisco',
  //     'The latest and greatest smartphone from Apple with an A15 Bionic chip and 5G connectivity.',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ['iPhone', 'Apple', 'smartphone']
  //   ),
  //   new Item(
  //     10,
  //     20,
  //     'Men\'s Running Shoes',
  //     79.99,
  //     'New York',
  //     'Comfortable and durable running shoes for men.',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ['shoes', 'running', 'men\'s fashion']
  //   ),
  //   new Item(
  //     11,
  //     50,
  //     'Wireless Noise-Cancelling Headphones',
  //     199.99,
  //     'Los Angeles',
  //     'Premium over-ear headphones with active noise-cancellation technology.',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ['headphones', 'wireless', 'noise-cancelling', 'audio', 'music']
  //   ),
  //   new Item(
  //     12,
  //     99,
  //     'Women\'s Leather Jacket',
  //     149.99,
  //     'Chicago',
  //     'A stylish and comfortable leather jacket for women.',
  //     'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
  //     ['jacket', 'leather', 'women\'s fashion']
  //   )
  //  ]
  private items: Item[] = [];
  constructor(private http: HttpClient) {
    this.getOneItembyId(1).subscribe(data => {
      this.items[0] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(2).subscribe(data => {
      this.items[1] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(3).subscribe(data => {
      this.items[2] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(4).subscribe(data => {
      this.items[3] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(5).subscribe(data => {
      this.items[4] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(6).subscribe(data => {
      this.items[5] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(7).subscribe(data => {
      this.items[6] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(8).subscribe(data => {
      this.items[7] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(9).subscribe(data => {
      this.items[8] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(10).subscribe(data => {
      this.items[9] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(11).subscribe(data => {
      this.items[10] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(12).subscribe(data => {
      this.items[11] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(13).subscribe(data => {
      this.items[12] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(14).subscribe(data => {
      this.items[13] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(15).subscribe(data => {
      this.items[14] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(16).subscribe(data => {
      this.items[15] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(17).subscribe(data => {
      this.items[16] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(18).subscribe(data => {
      this.items[17] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(19).subscribe(data => {
      this.items[18] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
    this.getOneItembyId(20).subscribe(data => {
      this.items[19] = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });
  }

  getItems() {
    return this.items.slice();
  }

  // @ts-ignore
  getItem(id: number): Item {
    for (let item of this.items) {
      if(item.itemID == id)
        return item;
    }
  }
  // getItem(id: number): Item {
  //   this.get1item(id);
  //   return this.item;
  // }

  getOneItembyId(itemId: number): Observable<any> {
    const url = `${this.apiUrl}/itemid/${itemId}`;
    return this.http.get(url);
  }

  get1item(itemid: number) {
    //this.itemid = item;
    // 将要获取的商品ID
    this.getOneItembyId(itemid).subscribe(data => {
      this.item = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
    });

  }

  editItem(id: string, body: any) {
    const url = `${this.apiUrl}${id}`;
    return this.http.put(url, {body: body});
  }

  getItemByUserId(userId: string): Observable<any> {
    const apiUrl = `${this.apiUrl}/${userId}`;
    return this.http.get(apiUrl);
  }

  getItemsByMutiIds(ids: number[]): Observable<any[]> {
    const urls = ids.map(id => `http://127.0.0.1:3001/item/itemid/${id}`);
    return forkJoin(urls.map(url => this.http.get(url))).pipe(
      map((data: any[]) => {
        return data.map(item => item.rows[0]);
      })
    );
  }

  addItem(userId: string, itemName: string, itemLocation: string, other: string, itemDescription: string, itemImgId: string) {
    const body = {userId, itemName, itemLocation, other, itemDescription, itemImgId};
    return this.http.post(`http://127.0.0.1:3001/item/${userId}`, body);
  }

  deleteItem(itemId: string): Observable<void> {
    const url = `${this.apiUrl}/${itemId}`;
    return this.http.delete<void>(url);
  }

  ngOnInit() {



  }

}
