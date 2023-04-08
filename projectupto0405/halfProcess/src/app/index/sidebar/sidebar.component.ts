import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit{
  rotateDegrees = 0;
  constructor( private authService:AuthService) {

  }

  ngOnInit() {
  }

  onToggle(event: any) {
    console.log(event);
    this.rotateDegrees = event ? 180 : 0;
  }

  logout(){
    this.authService.logout();
  }
}
