import { Injectable } from '@angular/core';
import {NgForm} from "@angular/forms";
import {BehaviorSubject, Observer} from "rxjs";
import {User} from "../user.model";
import {SHA256} from "crypto-js";
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user=new BehaviorSubject<User|null>(null);
  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private router: Router) { }
  loginSuccessState=new BehaviorSubject<boolean>(false);
  signupstate=new BehaviorSubject<boolean>(true);


  login(email:string, password:string){
    const observer: Observer<any> = {
      next: response => {
        console.log('Response:', response)
        if(response.result=="user or password error"){
          console.log("login unsuccess, username or password wrong");
          this.loginSuccessState.next(true);
        }
        else {
          this.loginSuccessState.next(false);
          const user=new User(response.user_id,response.user_name,response.real_name,response.email,
            response.location,response.profile_img_id,response.bio,response.password,response.has_items_list,response.other_info,new Date(new Date().getTime()+24*60*60*1000));
          console.log(user);
          this.user.next(user);
          localStorage.removeItem('userData');
          localStorage.setItem('userData',JSON.stringify(user));
          this.router.navigate(['map']);

        }
      },
      error: error => console.error('Error:', error),
      complete: () => console.log('Request completed')
    };
    // console.log(form.value.password);
    password=SHA256(password).toString();
    // console.log(form.value.password);
    const myurl='http://localhost:3001/user/password/email';
    const body={
      email:email,
      password: password};
    this.http.post(myurl,body).subscribe(observer);
  }


  signUp(form: NgForm){
    //console.log(form.value.password);
    const original_password=form.value.password;
    const email=form.value.email;
    form.value.password=SHA256(form.value.password).toString();
    //console.log(form.value.password);
    form.value.realName=form.value.realName;
    form.value.bio=null;
    form.value.other=null;
    form.value.profileImgId=null;

    const observer: Observer<any> = {
      next: response => {
        console.log('Response:', response);
        this.login(email,original_password);
        this.signupstate.next(true);
        },
      error: error => {
        this.signupstate.next(false);
        console.log('Error:', error);
      },
      complete: () => console.log('Request completed')
    };

    this.http.post('http://localhost:3001/user/new',form.value,).subscribe(observer);


  }
  logout(){
    this.user.next(null);
    localStorage.removeItem('userData');
  }

  autoLogin(){
const aData=localStorage.getItem('userData');
if(!aData){
  return;
}
const userData:{
  user_id: number;
  user_name: string;
  real_name: string;
  email: string;
  location: string;
  profile_img_id: string | null;
  bio: string | null;
  password: string;
  has_items_list: number;
  other_info: string | null;
  _token:boolean;
  expirationTime:string;

}=JSON.parse(aData);
const loaduser=new User(userData.user_id,userData.user_name,userData.real_name,userData.email,userData.location
  ,userData.profile_img_id,userData.bio,userData.password,userData.has_items_list
  ,userData.other_info,new Date(userData.expirationTime));
    if(loaduser.getToken()) {
      this.user.next(loaduser);
      this.router.navigate(['map']);
    }
else return;
  }


  editprofile(form:NgForm){

    const observer: Observer<any> = {
      next: response => {
        console.log('Response:', response);
      },
      error: error => {
        console.log('Error:', error);
      },
      complete: () => console.log('Request completed')
    };

    const myurl='http://localhost:3001/user/'+form.value.userid;
    this.http.put(myurl,form.value).subscribe(observer);

  }

  refrashInfor(auser:User){
    this.user.next(auser);
  }



}
