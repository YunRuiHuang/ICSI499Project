import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import { Item } from 'src/app/shared/item.model';
import {ItemService} from "../../shared/services/item.service";
import {ActivatedRoute, Params} from "@angular/router";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit{

  item!: Item;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute
  ) {

  }

  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          // @ts-ignore
          this.item = this.itemService.getItem(+params['id'])
        }
      )
  }



  onSubmit() {
  }

}
