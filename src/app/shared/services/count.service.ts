import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CountService {
  public count1=1;
  public count2=1;
  constructor() { }
}
