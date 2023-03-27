import { Component } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {NgForm} from "@angular/forms";
import {SHA256} from "crypto-js";
import {BehaviorSubject, Observer, Subject} from "rxjs";
import {User} from "./User";

@Component({
  selector: 'app-loginpage',
  templateUrl: './loginpage.component.html',
  styleUrls: ['./loginpage.component.css']
})
export class LoginpageComponent {

  user=new BehaviorSubject<User|null>(null);
  constructor(private http: HttpClient) {
  }
  login(form: NgForm){

    const observer: Observer<any> = {
      next: response => {
        console.log('Response:', response)
      if(response=="success"){
        const user=new User(form.value.User_name,"authorized_user");
        this.user.next(user);
      }
      else {
      }
      },
      error: error => console.error('Error:', error),
      complete: () => console.log('Request completed')
    };

    // console.log(form.value.password);
    form.value.password=SHA256(form.value.password).toString();
    // console.log(form.value.password);
    const myurl='http://localhost:3001/user/password/email';
    const body={
      email:form.value.email,
      password: form.value.password};
    this.http.post(myurl,body).subscribe(observer);
    //this.http.request('GET',myurl,{ body, headers, observe: 'response' }).subscribe(observer);

  }
}
