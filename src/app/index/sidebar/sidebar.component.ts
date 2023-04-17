import {Component, OnInit} from '@angular/core';
import {ItemService} from "../../shared/services/item.service";
import {Subscription} from "rxjs";
import {User} from "../../shared/user.model";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  rotateDegrees = 0;

  private userSub?: Subscription;
  profile_img_id:string="./assets/empty_Avatar.png";
  username:string="";
  user:User|null =null;

  constructor(
    private itemService: ItemService,
    private authService:AuthService
  ) {

  }

  ngOnInit() {
    this.itemService.getItems();
    this.itemService.refreshlist();
    this.authService.autoLogin();
    this.userSub=this.authService.user.subscribe(user=>{
        if(!!user) {
          this.user = user;
          this.username=this.user.user_name;
          if(this.user.profile_img_id!=null&&this.user.profile_img_id!="")
            this.profile_img_id = this.user.profile_img_id;
        }else {
          this.username="No User Login";
          this.profile_img_id="./assets/empty_Avatar.png";
        }
      }
    );

  }

  onToggle(event: any) {
    console.log(event);
    this.rotateDegrees = event ? 180 : 0;
  }
  logout(){
    this.authService.logout();
  }
}
