import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemService} from "../../shared/services/item.service";

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  body={userId:'2',itemName:'',itemLocation:'',other:'0',itemDescription:'', itemImgId:''};
  id='1';
  public requestPayload: any;

  constructor(private http: HttpClient, private itemService: ItemService) {
  }
  onSubmit(){
    this.requestPayload = this.body;
    if (this.body.itemName.length > 50 || this.body.itemLocation.length > 100) {
      console.log('item name or itemLocation is too long!');
      return;
    }
    const url = `http://127.0.0.1:3001/item/${this.body.userId}`;
    this.http.post(url, this.body).subscribe(() => {
      console.log('item added');
      this.body = {userId:'1',itemName: '', itemLocation: '',other:'0',itemDescription:'',itemImgId:''};
    })

  }


  ngOnInit(): void {

  }




}
