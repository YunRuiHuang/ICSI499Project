import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ItemService} from "../../shared/services/item.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";
import {User} from "../../shared/user.model";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-item-add',
  templateUrl: './item-add.component.html',
  styleUrls: ['./item-add.component.css']
})
export class ItemAddComponent implements OnInit {
  userId: number | undefined =2; // declare input property for user ID
  private userSub?: Subscription;
  user:User|null =null;

  body={userId:this.userId, itemName:'',itemLocation:'',other:'0',itemDescription:'', itemImgId:'',itemKeywords:[] as string[]};
  id='1';
  public requestPayload: any;

  constructor(private http: HttpClient,
              private itemService: ItemService,
              private snackBar: MatSnackBar,
              private router: Router,
              private authService: AuthService
  ) {
  }
  onSubmit(){
    this.requestPayload = this.body;
    if (this.body.itemName.length > 50 || this.body.itemLocation.length > 100) {
      console.log('item name or itemLocation is too long!');
      return;
    }
    const keywords = this.body.itemName.split(' ').concat(this.body.itemLocation).map(keyword => `"${keyword}"`).join(',');
    this.body.itemKeywords = this.body.itemName.split(' ').concat(this.body.itemLocation).map(keyword => keyword.trim()).filter(keyword => keyword !== '');
    const url = `http://127.0.0.1:3001/item/${this.body.userId}`;
    this.http.post(url, this.body).subscribe(() => {
      console.log(this.body);
      console.log('item added');
      this.body = {userId:this.userId,itemName: '', itemLocation: '',other:'0',itemDescription:'',itemImgId:'',itemKeywords:[]};
    })
    this.snackBar.open('Item updated successfully!', 'OK', {duration: 3000});
    //加个刷新
    //this.itemService.refreshlist();
    this.itemService.refreshlist();
    setTimeout(() => {
      this.router.navigateByUrl('/');
      setTimeout(() => {
        this.itemService.refreshlist();
        this.router.navigateByUrl('/items/item-list');
      }, 100);
    }, 100);
  }


  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
        //if(!!user)
        this.user=user;
        //else this.user=new User(0,"not login","not login","not login","not login",null,"not login","not login",0,"not login",new Date());
        //the above 1 line is test purpose code, allow you to test the page without relogin every time the page reload
      }
    );
    this.userId=this.user?.getUserId();
    this.body.userId=this.userId;
  }
}
