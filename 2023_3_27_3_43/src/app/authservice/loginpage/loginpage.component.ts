import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {SHA256} from "crypto-js";
import {BehaviorSubject, Observer, Subject} from "rxjs";
import {User} from "./User";
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent implements OnInit{
loginunsuccess: boolean=false;
loginunccessSubscription: Subscription=new Subscription();
  user=new BehaviorSubject<User|null>(null);
  constructor(private http: HttpClient,private authService: AuthService) {
  }
  ngOnInit():void{
this.loginunccessSubscription=this.authService.loginSuccessState.subscribe((state:boolean)=>{this.loginunsuccess=state})
  }
  login(form: NgForm){

 this.authService.login(form.value.email,form.value.password);

 //  form.reset();

  }
}
