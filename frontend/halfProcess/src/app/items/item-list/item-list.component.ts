import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from "../../shared/services/item.service";
import {Item} from "../../shared/item.model";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../shared/user.model";

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
})
export class ItemListComponent implements OnInit {

  items: Item[] = [];
  userId: number | undefined =2; // declare input property for user ID
  private userSub?: Subscription;
  user:User|null =null;

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
    this.items = this.itemService.getItems();
  }

  onSelected(item: Item) {
    this.itemService.itemSelected.emit(item);
  }


}
