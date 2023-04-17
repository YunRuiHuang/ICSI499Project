import {Component, createComponent, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {SHA256} from "crypto-js";
import {Observer, Subscription} from "rxjs";
import {AuthService} from "../../shared/services/auth.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-user-signup',
  templateUrl: './user-signup.component.html',
  styleUrls: ['./user-signup.component.css']
})
export class UserSignupComponent implements OnInit{
  constructor(private http: HttpClient,private authService: AuthService,private router: Router) {
  }
  signupState:boolean=true;
  signupSubscription: Subscription=new Subscription();
  ngOnInit() {
    this.signupSubscription=this.authService.signupstate.subscribe((state:boolean)=>{this.signupState=state});
  }

  // onSubmit(form: NgForm){
  //   //console.log(form.value.password);
  //   form.value.password=SHA256(form.value.password).toString();
  //   //console.log(form.value.password);
  //   form.value.realName="test name";
  //   form.value.bio="test bio";
  //   form.value.other=null;
  //   form.value.profileImgId=null;
  //
  //   const observer: Observer<any> = {
  //     next: response => console.log('Response:', response),
  //     error: error => console.error('Error:', error),
  //     complete: () => console.log('Request completed')
  //   };
  //
  //   this.http.post('http://localhost:3001/user/new',form.value).subscribe(observer);
  //   form.reset();
  //
  // }


  onSubmit(form: NgForm){
    this.authService.signUp(form);
    form.reset();

  }


}
