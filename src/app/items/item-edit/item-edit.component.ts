import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Item} from 'src/app/shared/item.model';
import {ItemService} from "../../shared/services/item.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  item!: Item;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router
  ) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // @ts-ignore
          this.item = this.itemService.getItem(+params['id'])
        }
      )
  }


  onSubmit() {
    this.snackBar.open('Item updated successfully!', 'OK', {duration: 3000});
    this.itemService.refreshItem();
    this.router.navigateByUrl('/items/item-list');
  }

}
