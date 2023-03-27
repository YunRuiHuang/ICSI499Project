import {Component, createComponent, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { SHA256 } from 'crypto-js';
import {Observer, Subscription} from "rxjs";
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit{
  signupState:boolean=true;
  signupSubscription: Subscription=new Subscription();
  constructor(private http: HttpClient,private authService: AuthService) {
  }
  ngOnInit() {
    this.signupSubscription=this.authService.signupstate.subscribe((state:boolean)=>{this.signupState=state});
  }

  onSubmit(form: NgForm){
this.authService.signUp(form);
    form.reset();

  }
}
