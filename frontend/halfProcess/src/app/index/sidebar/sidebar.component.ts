import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  rotateDegrees = 0;
  constructor() {

  }

  ngOnInit() {
  }

  onToggle(event: any) {
    console.log(event);
    this.rotateDegrees = event ? 180 : 0;
  }
}
