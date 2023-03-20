import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DevUIModule } from 'ng-devui';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FormsModule } from "@angular/forms";
import { MapComponent } from './map/map.component';
import { HeaderComponent } from './header/header.component';
import { ItemsComponent } from './items/items.component';
import { ItemListComponent } from './items/item-list/item-list.component';
import { ItemDetailComponent } from './items/item-detail/item-detail.component';
import { ItemEditComponent } from './items/item-edit/item-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    MapComponent,
    HeaderComponent,
    ItemsComponent,
    ItemListComponent,
    ItemDetailComponent,
    ItemEditComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DevUIModule,
    FormsModule
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
