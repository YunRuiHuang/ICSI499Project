import {Component, Input} from '@angular/core';
import { Item } from 'src/app/shared/item.model';
import {ItemService} from "../item.service";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent {
  // @ts-ignore
  @Input() item: Item;

  constructor(private recipeService: ItemService) { }
}
