import {Component, Input} from '@angular/core';
import {ItemService} from "../item.service";
import {Item} from "../../shared/item.model";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent {
  // @ts-ignore
  items: Item[];

  constructor(private itemService: ItemService) {
  }

  ngOnInit() {
    this.items = this.itemService.getItems();
  }

  onSelected(item: Item) {
    this.itemService.itemSelected.emit(item);
  }
}
