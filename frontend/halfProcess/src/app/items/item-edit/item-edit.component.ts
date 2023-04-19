import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Item} from 'src/app/shared/item.model';
import {ItemService} from "../../shared/services/item.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-item-edit',
  templateUrl: './item-edit.component.html',
  styleUrls: ['./item-edit.component.scss']
})
export class ItemEditComponent implements OnInit {

  item!: Item;

  constructor(private itemService: ItemService,
              private route: ActivatedRoute,
              private snackBar: MatSnackBar,
              private router: Router
  ) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          // @ts-ignore
          this.item = this.itemService.getItem(+params['id'])
        }
      )
  }


  onSubmit() {
    this.snackBar.open('Item updated successfully!', 'OK', {duration: 3000});
    this.itemService.refreshItem();
    this.router.navigateByUrl('/users/user-item-list');
  }

  @ViewChild('autocomplete')
  autocompleteInput!: ElementRef;
  ngAfterViewInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.nativeElement, {
      types: ['address'], // Restrict the results to addresses only
      componentRestrictions: { country: 'US' }, // Restrict the results to the United States
      fields: ['formatted_address'] // Specify the data to be returned (in this case, just the formatted address)
    });
    autocomplete.addListener('place_changed', () => {
      const place = autocomplete.getPlace();
      if (place.formatted_address) {
        this.item.itemLocation = place.formatted_address;
        console.log(this.item.itemLocation);
      }
    });
  }


}
