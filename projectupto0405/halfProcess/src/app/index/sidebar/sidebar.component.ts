import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../shared/user.model";

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

  constructor( private authService:AuthService) {

  }

  ngOnInit() {
    this.authService.autoLogin();
    this.userSub=this.authService.user.subscribe(user=>{
      if(!!user) {
        this.user = user;
        this.username=this.user.user_name;
        if(this.user.profile_img_id!=null&&this.user.profile_img_id!="")
        this.profile_img_id = this.user.profile_img_id;
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
