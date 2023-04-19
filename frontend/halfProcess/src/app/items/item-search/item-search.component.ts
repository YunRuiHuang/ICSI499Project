import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ItemService} from "../../shared/services/item.service";
import {Router} from "@angular/router";

interface ItemSearchResult {
  rows: {
    item_id: number;
    times: number;
  }[];
}

@Component({
  selector: 'app-item-search',
  templateUrl: './item-search.component.html',
  styleUrls: ['./item-search.component.css']
})
export class ItemSearchComponent implements OnInit {
  searchInput: string = '';
  searchResults: any[] = [];
  sortedIds:any[] = [];
  constructor(
    private http: HttpClient,
    private itemService: ItemService,
    private router: Router
  ) { }

  ngOnInit(): void {
    localStorage.setItem('count1', '2');
  }

  async search(): Promise<void> {
    const url = 'http://127.0.0.1:3001/item/search/keyword';
    const body = { itemKeywords: this.searchInput.split(' ') };
    console.log(JSON.stringify(body));
    const data = await this.http.post<ItemSearchResult>(url, body).toPromise();
    this.searchResults = data?.rows||[];
    console.log(data);

    // 对 data 数组按 times 从小到大排序
    const sortedData = data?.rows.sort((a, b) => b.times - a.times)||[];
    this.sortedIds = sortedData.map(item => item.item_id);
    console.log(this.sortedIds);

    // 跳转到搜索结果列表
    await this.itemService.refreshsearchlist(this.sortedIds);
    await this.router.navigateByUrl('/items/item-search-list');
  }
}
