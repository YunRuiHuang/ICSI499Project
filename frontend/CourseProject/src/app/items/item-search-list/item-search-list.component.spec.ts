import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemSearchListComponent } from './item-search-list.component';

describe('ItemSearchListComponent', () => {
  let component: ItemSearchListComponent;
  let fixture: ComponentFixture<ItemSearchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemSearchListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemSearchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
