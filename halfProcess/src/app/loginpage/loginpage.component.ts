import { Component } from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
    // console.log(form.value.password);
    //form.value.password=SHA256(form.value.password).toString();
    // console.log(form.value.password);

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

form.value.User_name="hjx";
form.value.Password="28f0116ef42bf718324946f13d787a1d41274a08335d52ee833d5b577f02a32a";
console.log(form.value);
    this.http.get('http://localhost:3001/user/password/:id',form.value).subscribe(observer);

    form.reset();
  }
}
