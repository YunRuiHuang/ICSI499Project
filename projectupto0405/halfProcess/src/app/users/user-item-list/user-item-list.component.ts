import {Component, OnInit} from '@angular/core';
import {Item} from "../../shared/item.model";
import {HttpClient} from "@angular/common/http";
import {ItemsComponent} from "../../items/items.component";
import {ItemService} from "../../shared/services/item.service";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";

@Component({
  selector: 'app-user-item-list',
  templateUrl: './user-item-list.component.html',
  styleUrls: ['./user-item-list.component.css']
})
export class UserItemListComponent implements OnInit{
  items: Item[] = [];
  id?: number;
  userId=2; // declare input property for user ID

  constructor(private http: HttpClient,
              private router: Router,
              private itemService: ItemService,
              private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.items = this.itemService.getItems();
  }

  onSelected(item: Item) {
    this.router.navigate(['items/item-list/', item.itemID, 'edit'] );
  }


}
