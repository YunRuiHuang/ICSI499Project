import {Injectable, OnInit} from '@angular/core';
import {async, Observable, Observer} from 'rxjs';
import {HttpClient} from "@angular/common/http";
import {MapGeocoder} from "@angular/google-maps";
import {Item} from "../item.model";
import {ItemService} from "./item.service";


@Injectable({
  providedIn: 'root'
})
export class MapService implements OnInit{

  items: Item[] = [];
  constructor(private http: HttpClient,
              private itemService: ItemService
  ) { }

  ngOnInit() {
    this.items = this.itemService.getItems();
    console.log("mapService" + this.items);
  }

   // getMarkers() {
   //  const geocoder = new google.maps.Geocoder();
   //  const markers = [];
   //  for (const item of this.items) {
   //    geocoder.geocode({ address: item.itemLocation }, (results, status) => {
   //      if (status === "OK") {
   //        const location = results[0].geometry.location;
   //        markers.push({
   //          lat: location.lat(),
   //          lng: location.lng(),
   //          title: item
   //        });
   //      } else {
   //        console.log(`Geocode was not successful for the following reason: ${status}`);
   //      }
   //    });
   //  }
   //  return markers;



}
