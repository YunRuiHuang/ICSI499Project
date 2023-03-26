import { Component } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import { SHA256 } from 'crypto-js';
import {Observer} from "rxjs";

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent {
  constructor(private http: HttpClient) {
  }
  onSubmit(form: NgForm){
    //console.log(form.value.password);
    form.value.password=SHA256(form.value.password).toString();
    //console.log(form.value.password);
    form.value.realName="test name";
    form.value.bio="test bio";
    form.value.other=null;
    form.value.profileImgId=null;

    const observer: Observer<any> = {
      next: response => console.log('Response:', response),
      error: error => console.error('Error:', error),
      complete: () => console.log('Request completed')
    };

    this.http.post('http://localhost:3001/user/new',form.value).subscribe(observer);
    form.reset();

  }
}
