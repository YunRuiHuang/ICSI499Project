import {Item} from "../item.model";
import {EventEmitter, Injectable, OnInit} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {forkJoin, map, Observable} from "rxjs";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {ActivatedRoute} from "@angular/router";

@Injectable({providedIn: 'root'})
export class SearchListGuard implements CanActivate {
  private hasNavigated = false;

  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.hasNavigated) {
      return true;
    } else {
      this.hasNavigated = true;
      this.router.navigateByUrl('/items/item-list');
      return false;
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class ItemService implements OnInit {
  itemSelected = new EventEmitter<Item>();
  private apiUrl = 'http://127.0.0.1:3001/item';
  private item!: Item;

  private items: Item[] = [];
  private searchedItems: Item[] = [];
  private userItems: Item[] = [];

  constructor(private http: HttpClient) {
    this.refreshlist();
  }

  getItems() {
    return this.items.slice();
  }

  getSearchedItems() {
    return this.searchedItems.slice();
  }

  getUserItems() {
    return this.userItems.slice();
  }

  // @ts-ignore
  getItem(id: number): Item {
    for (let item of this.items) {
      if (item.itemID == id)
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



  editItem(item: Item) {
    const url = `${this.apiUrl}/${item.itemID}`;
    const keywords = item.itemName.split(' ')
      .concat(item.itemLocation.split(' '))
      .map(keyword => keyword.trim())
      .filter(keyword => keyword !== '');
    const body = {
      userId: item.userID,
      itemName: item.itemName,
      itemLocation: item.itemLocation,
      itemDescription: item.itemDescription,
      itemImgId: item.itemImageURL,
      other: item.itemPrice,
      itemKeywords: keywords
    };
    return this.http.put(url, body).subscribe(result => console.log(result));
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

  SearchItem(itemName: string, itemLocation: string) {
    const body = {itemName, itemLocation};
    //return this.http.post(`http://127.0.0.1:3001/item/${userId}`, body);
    this.http.post(`http://127.0.0.1:3001/search`, body).subscribe((data: any) => {
      this.searchedItems = data.rows.map((row: any) =>
        new Item(
          row.item_id,
          row.user_id,
          row.item_name,
          row.other_info,
          row.item_location,
          row.item_description,
          row.item_img_id,
          row.item_keywords
        )
      );
    });
  }

  // getUserItem(userid: number) {
  //   //const body = {itemName, itemLocation};
  //   //return this.http.post(`http://127.0.0.1:3001/item/${userId}`, body);
  //   this.http.get(`http://127.0.0.1:3001/item/userid/${userid}`).subscribe((data: any) => {
  //     this.userItems = data.rows.map((row: any) =>
  //       new Item(
  //         row.item_id,
  //         row.user_id,
  //         row.item_name,
  //         row.other_info,
  //         row.item_location,
  //         row.item_description,
  //         row.item_img_id,
  //         row.item_keywords
  //       )
  //     );
  //   });
  // }

  refreshUesrItemlist(userid: number|undefined) {
    this.http.get(`http://127.0.0.1:3001/item/userid/${userid}`).subscribe((data: any) => {
      this.userItems = data.rows.map((row: any) =>
        new Item(
          row.item_id,
          row.user_id,
          row.item_name,
          row.other_info,
          row.item_location,
          row.item_description,
          row.item_img_id,
          row.item_keywords.split(",") // Split the string of keywords into an array
        )
      );
    });
  }

  refreshItem() {
    for (let i = 0; i < this.items.length; i++) {
      setTimeout(() => {
        this.editItem(this.items[i]);
      }, i * 1000); // 增加 1 秒的延迟
    }
  }

  deleteItem(itemId: string): Observable<void> {
    const url = `${this.apiUrl}/${itemId}`;
    return this.http.delete<void>(url);
  }

  refreshlist() {
    let count = 0;
    for (let i = 1; count < 20 && i <= 50; i++) {
      this.getOneItembyId(i).subscribe(data => {
        if (data.rows.length > 0) {
          let item = new Item(data.rows[0].item_id, data.rows[0].user_id, data.rows[0].item_name, data.rows[0].other_info, data.rows[0].item_location, data.rows[0].item_description, data.rows[0].item_img_id, data.rows[0].item_keywords);
          this.items[count] = item;
          count++;
        }
      });
    }
  }

  refreshsearchlist(sortedIds: number[]) {
    let count = 0;
    this.searchedItems = [];
    for (let i = 0; count < 20 && i < sortedIds.length; i++) {
      const id = sortedIds[i];
      this.getOneItembyId(id).subscribe((data) => {
        if (data.rows.length > 0) {
          const item = new Item(
            data.rows[0].item_id,
            data.rows[0].user_id,
            data.rows[0].item_name,
            data.rows[0].other_info,
            data.rows[0].item_location,
            data.rows[0].item_description,
            data.rows[0].item_img_id,
            data.rows[0].item_keywords
          );
          this.searchedItems[count] = item;
          count++;
          console.log(this.searchedItems);
        }
      });
    }
  }

  ngOnInit() {
  }
}

