import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";
import {Subscription} from "rxjs";
import {User} from "../../shared/user.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styleUrls: ['./profiles.component.css']
})
export class ProfilesComponent implements OnInit{
editing:boolean=false;
private userSub?: Subscription;
// user:User =new User(0,"not login","not login","not login","not login","not login","not login","not login",0,"not login",);

  user:User|null =null;

  constructor(private authService: AuthService) {
}

//   ngOnInit(): void {
// this.userSub=this.authService.user.subscribe(user=>{
//   if(!!user)
//   this.user=user;
//   else this.user=new User(0,"not login","not login","not login","not login","not login","not login","not login",0,"not login",);
// }
// );
//   }

  ngOnInit(): void {
    this.userSub=this.authService.user.subscribe(user=>{
      if(!!user)
          this.user=user;
      else this.user=new User(0,"not login","not login","not login","not login",null,"not login","not login",0,"not login",);
     //the above 1 line is test purpose code, allow you to test the page without relogin every time the page reload
      }
    );
  }

  editpage(form: NgForm){

    //this.authService.login(form.value.email,form.value.password);
    this.editing=false;
     form.value.userid=this.user?.getUserId();
     form.value.password=this.user?.getPassword();
     form.value.email=this.user?.getEmail();
     form.value.profileImgId=`'${form.value.profileImgId}'`;
    console.log(form.value);
    this.authService.editprofile(form);
//  form.reset();
  }





}
