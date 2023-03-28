import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevUIModule } from 'ng-devui';

import { AppComponent } from './app.component';
import { SidebarComponent } from './index/sidebar/sidebar.component';
import { FormsModule } from "@angular/forms";
import { MapComponent } from './map/map.component';
import { ItemsComponent } from './items/items.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';
import { AppRoutingModule } from "./app-routing.module";
import { ItemAddComponent } from './items/item-add/item-add.component';
import { UsersComponent } from './users/users.component';
import { UserSignupComponent } from './users/user-signup/user-signup.component';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { UserItemListComponent } from './users/user-item-list/user-item-list.component';
import {ItemService} from "./shared/services/item.service";
import { UserLoginComponent } from './users/user-login/user-login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MapComponent,
    ItemsComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemEditComponent,
    ItemAddComponent,
    UsersComponent,
    UserSignupComponent,
    UserItemListComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DevUIModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
