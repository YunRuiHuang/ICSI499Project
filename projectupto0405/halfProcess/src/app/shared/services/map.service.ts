import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import {HttpClient} from "@angular/common/http";

declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class MapService {

  constructor(private http: HttpClient) { }

  getLocation(location: string) {
    const endpoint = 'https://maps.googleapis.com/maps/api/geocode/json';
    const params = {
      address: location,
      key: 'AIzaSyCnRB4qa2YPreHaPelqeIs7vUxZtUTNQBM&amp'
    };

    return this.http.get(endpoint, {params});
  }
}
