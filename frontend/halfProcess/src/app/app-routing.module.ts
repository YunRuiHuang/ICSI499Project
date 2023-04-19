import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemsComponent} from "./items/items.component";
import {ItemDetailComponent} from "./items/item-detail/item-detail.component";
import {ItemEditComponent} from "./items/item-edit/item-edit.component";
import {MapComponent} from "./map/map.component";
import {ItemListComponent} from "./items/item-list/item-list.component";
import {ItemAddComponent} from "./items/item-add/item-add.component";
import {UsersComponent} from "./users/users.component";
import {UserSignupComponent} from "./users/user-signup/user-signup.component";
import {UserItemListComponent} from "./users/user-item-list/user-item-list.component";
import {UserLoginComponent} from "./users/user-login/user-login.component";
import {ItemSearchComponent} from "./items/item-search/item-search.component";
import {ItemSearchListComponent} from "./items/item-search-list/item-search-list.component";
import {ProfilesComponent} from "./users/profiles/profiles.component";

const appRoutes: Routes = [
  {path: '', redirectTo: '/items/item-list', pathMatch: "full"},
  {path: 'users', component: UsersComponent, children: [
      {path: 'user-signup', component: UserSignupComponent},
      {path: 'user-item-list', component: UserItemListComponent},
      {path: 'user-login', component: UserLoginComponent},
      {path: 'profiles', component: ProfilesComponent}
    ]},
  {path: 'items', component: ItemsComponent
    , children: [
      {path: 'item-list', component: ItemListComponent},
      {path: 'item-add', component: ItemAddComponent},
      {path: 'item-search', component: ItemSearchComponent},
      {path: 'item-search-list', component: ItemSearchListComponent },
      {path: 'item-search-list/:id', component: ItemDetailComponent },
      {path: 'item-list/:id/edit', component: ItemEditComponent},
      {path: 'item-list/:id', component: ItemDetailComponent},
    ]
  },
  {path: 'map', component: MapComponent},
  // {
  //   path: '',
  //   component: UserLoginComponent
  // },
  // {
  //   path: 'items',
  //   children: [
  //     {
  //       path: '',
  //       redirectTo: 'item-list',
  //       pathMatch: 'full'
  //     },
  //     {
  //       path: 'item-list',
  //       component: ItemListComponent
  //     },
  //     {
  //       path: 'add-item',
  //       component: ItemAddComponent
  //     }
  //   ]
  // },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
