import {Component, OnInit} from '@angular/core';
import {Item} from "../../shared/item.model";
import {HttpClient} from "@angular/common/http";
import {ItemsComponent} from "../../items/items.component";
import {ItemService} from "../../shared/services/item.service";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../shared/user.model";

@Component({
  selector: 'app-user-item-list',
  templateUrl: './user-item-list.component.html',
  styleUrls: ['./user-item-list.component.css']
})
export class UserItemListComponent implements OnInit{
  items: Item[] = [];
  id?: number;
  userId: number | undefined =2; // declare input property for user ID
  private userSub?: Subscription;
  user:User|null =null;
  dataloaded=false;
  constructor(private http: HttpClient,
              private router: Router,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private authService: AuthService
  ) { }

  ngOnInit() {
    this.userSub=this.authService.user.subscribe(user=>{
        //if(!!user)
        this.user=user;
        //else this.user=new User(0,"not login","not login","not login","not login",null,"not login","not login",0,"not login",new Date());
        //the above 1 line is test purpose code, allow you to test the page without relogin every time the page reload
      }
    );
    this.userId=this.user?.getUserId();
    this.itemService.refreshUesrItemlist(this.userId);
    this.items = this.itemService.getUserItems();
    this.dataloaded=true;
  }

  // save(){
  //   if(this.dataloaded){
  //     this.dataloaded=true;
  //     setTimeout(() => {
  //       this.router.navigateByUrl('/items/item-list');
  //       setTimeout(() => {
  //         this.router.navigateByUrl('/items/user-item-list');
  //       }, 100);
  //     }, 100);
  //   }
  // }

  onSelected(item: Item) {
    this.router.navigate(['items/item-list/', item.itemID, 'edit'] );
  }
}
