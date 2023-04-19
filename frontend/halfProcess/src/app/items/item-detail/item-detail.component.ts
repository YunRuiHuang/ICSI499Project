import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../shared/item.model";
import {ItemService} from "../../shared/services/item.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as QRCode from 'qrcode';
import {Location} from "@angular/common";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit{
  selectedItem!: Item;
  qrCodeDataURL!: string;
  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location
  ) {
    this.generateQRCode(this.location.path())
  }

  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          // @ts-ignore
          this.selectedItem = this.itemService.getItem(+params['id'])
        }
    )
    console.log(this.selectedItem)
  }


  async generateQRCode(url: string) {
    try {
      this.qrCodeDataURL = await QRCode.toDataURL(url);
    } catch (err) {
      console.error(err);
    }
  }


}
