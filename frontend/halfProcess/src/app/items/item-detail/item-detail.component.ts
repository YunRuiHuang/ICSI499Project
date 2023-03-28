import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../shared/item.model";
import {ItemService} from "../../shared/services/item.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit{
  selectedItem!: Item;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          // @ts-ignore
          this.selectedItem = this.itemService.getItem(+params['id'])
        }
    )
  }

}
