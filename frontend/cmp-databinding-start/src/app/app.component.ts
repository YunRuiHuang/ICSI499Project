import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  itemElements = [];
  newItemName = '';
  newItemContent = '';

  onAddServer() {
    this.itemElements.push({
      type: 'server',
      name: this.newItemName,
      content: this.newItemContent
    });
  }

  onAddBlueprint() {
    this.itemElements.push({
      type: 'blueprint',
      name: this.newItemName,
      content: this.newItemContent
    });
  }
}
