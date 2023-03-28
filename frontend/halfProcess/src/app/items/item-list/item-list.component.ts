import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from "../../shared/services/item.service";
import {Item} from "../../shared/item.model";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {
  // items: any[] = [];
  //
  // constructor(private itemService: ItemService,
  //             private router: Router,
  //             private route: ActivatedRoute) {
  // }
  //
  // ngOnInit() {
  //   const itemIds = [1, 2, 3, 4, 5];
  //   this.itemService.getItemsByMutiIds(itemIds).subscribe((items: any[]) => {
  //     this.items = items;
  //   });
  //   console.log(this.items);
  // }
  //
  // onSelected(item: Item) {
  //   this.itemService.itemSelected.emit(item);
  // }
  items: Item[] = [];

  constructor(private itemService: ItemService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.items = this.itemService.getItems();
  }

  onSelected(item: Item) {
    this.itemService.itemSelected.emit(item);
  }


}
