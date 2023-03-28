import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {SHA256} from "crypto-js";
import {BehaviorSubject, Observer, Subject} from "rxjs";
import {User} from "../../shared/user.model";
import {AuthService} from "../../shared/services/auth.service";
import { Subscription } from 'rxjs';
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit{
  loginunsuccess: boolean=false;
  loginunccessSubscription: Subscription=new Subscription();
  user=new BehaviorSubject<User|null>(null);
  constructor(private http: HttpClient,private authService: AuthService, private router: Router) {
  }
  ngOnInit():void{
    this.loginunccessSubscription=this.authService.loginSuccessState.subscribe((state:boolean)=>{this.loginunsuccess=state})
  }
  login(form: NgForm){

    this.authService.login(form.value.email,form.value.password);

    //  form.reset();

  }

  onSubmit() {
    this.router.navigate(['users/user-item-list']);
  }

  temp() {
    this.router.navigate(['users/user-signup']);
  }
}
