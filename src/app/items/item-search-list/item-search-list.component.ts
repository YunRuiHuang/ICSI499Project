import {Component, Input, OnInit} from '@angular/core';
import {ItemService} from "../../shared/services/item.service";
import {Item} from "../../shared/item.model";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {CountService} from "../../shared/services/count.service";
import {timeout} from "rxjs";

@Component({
  selector: 'app-item-search-list',
  templateUrl: './item-search-list.component.html',
  styleUrls: ['./item-search-list.component.scss']
})
export class ItemSearchListComponent implements OnInit{

  items: Item[] = [];
  dataloaded=false;
  loadtime=1;
  constructor(private http: HttpClient,
              private router: Router,
              private itemService: ItemService,
              private route: ActivatedRoute,
              private count: CountService
  ) { }

  ngOnInit() {
    this.items = this.itemService.getSearchedItems();
    this.dataloaded=true;
    const count1 = localStorage.getItem('count1') || 0;
    console.log(count1);
    timeout(200);
    if (count1=='2') {
      localStorage.setItem('count1', '3');
      this.save();
    }
  }

  onSelected(item: Item) {
    this.itemService.itemSelected.emit(item);
  }

  save(){
    if(this.dataloaded){
      this.dataloaded=true;
      this.loadtime+=1;
      setTimeout(() => {
        this.router.navigateByUrl('/items/item-list');
        setTimeout(() => {
          this.router.navigateByUrl('/items/item-search-list');
        }, 100);
      }, 100);
    }
    console.log("saved");
  }
}
