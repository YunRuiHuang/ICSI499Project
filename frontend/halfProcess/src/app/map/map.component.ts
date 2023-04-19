import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MapInfoWindow, MapMarker} from "@angular/google-maps";
import {Observable} from "rxjs";
import {MapService} from "../shared/services/map.service";
import {ItemService} from "../shared/services/item.service";
import {Item} from "../shared/item.model";
import {Router} from "@angular/router";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit{

  center!: google.maps.LatLngLiteral;
  zoom = 13;
  maxZoom = 16;
  minZoom = 8;
  options: google.maps.MapOptions = {
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom:this.maxZoom,
    minZoom:this.minZoom,
  }
  @ViewChild(MapInfoWindow, { static: false })
  info!: MapInfoWindow;


  items: Item[] = [];
  markers = []  as  any;

  infoContent = ''


  constructor(private mapService: MapService,
              private itemService: ItemService,
              private router: Router

  ){}

  ngOnInit(): void {
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
    });

    this.items = this.itemService.getItems();
    console.log(this.itemService.getItems())
    this.getMarkers();
    console.log(this.markers)

  }

  ngAfterViewInit() {
    console.log(this.info);
  }



  openInfo(marker: MapMarker, content: string) {
    this.infoContent = content;
    this.info.open(marker)
  }

  addMarker() {
    this.markers.push({
      position: {
        lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
        lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
      },
      label: {
        color: 'red',
        text: 'Marker label ' + (this.markers.length + 1),
      },
      title: 'Marker title ' + (this.markers.length + 1),
      info: 'Marker info ' + (this.markers.length + 1),
      options: {
        animation: google.maps.Animation.DROP,
        //icon: ""
      },
    });
  }

  getMarkers() {
    const geocoder = new google.maps.Geocoder();
    for (const item of this.items) {
      geocoder.geocode({address: item.itemLocation}, (results, status) => {
        if (status === "OK" && results) {
          const location = results[0].geometry.location;
          this.markers.push({
            position: {
              lat: location.lat(),
              lng: location.lng(),
            },
            // label: {
            //   color: 'blue',
            //   text: 'Marker label ' + (this.markers.length + 1),
            // },
            title: item.itemName,
            info: item.itemDescription,
            options: {
              animation: google.maps.Animation.DROP,
              icon: {
                url: item.itemImageURL,
                scaledSize: new google.maps.Size(50, 50)
              }
            },
            itemID: item.itemID,
            // content: item.itemImageURL
          });
        } else {
          console.log(`Geocode was not successful for the following reason: ${status}`);
        }
      });
    }
  }

  goToItemDetail(itemID: number) {
    this.router.navigate(['items/item-list/', itemID]);
  }


}
