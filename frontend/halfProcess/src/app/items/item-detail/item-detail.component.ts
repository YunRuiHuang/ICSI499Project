import {Component, Input, OnInit} from '@angular/core';
import {Item} from "../../shared/item.model";
import {ItemService} from "../../shared/services/item.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import * as QRCode from 'qrcode';
import {Location} from "@angular/common";
import {HttpClient} from "@angular/common/http";
import {Observer} from "rxjs";

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit{
  selectedItem!: Item;
  qrCodeDataURL!: string;
  contactEmail!:string;
  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private http: HttpClient
  ) {
    this.generateQRCode(this.location.path())
  }

  ngOnInit(){
    this.route.params
      .subscribe(
        (params: Params) => {
          // @ts-ignore
          this.selectedItem = this.itemService.getItem(+params['id']);
          this.getContactEmail(this.selectedItem.userID.toString());
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

  getContactEmail(userID:string){
    const myurl='http://localhost:3001/user/id/'+userID;
    const observer: Observer<any> = {
      next: response => {
        console.log('Response:', response);
        this.contactEmail=response.email;
      },
      error: error => {
        console.error('Error:', error);
        this.contactEmail="no email available for some reasons";
      },
      complete: () => {
        console.log('Request completed');
      }
    };
    this.http.get(myurl).subscribe(observer);
  }


}
