# AdvancedIonicSelectList

`advnced-ionic-select-list` is an Angular library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.0 that provides a customizable Ionic select list component for Angular applications.

## Usage

First, import the AdvncedIonicSelectListModule into your Angular module.
```ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AdvncedIonicSelectListModule } from 'advnced-ionic-select-list';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AdvncedIonicSelectListModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

Then,You can use the AdvncedIonicSelectListComponent in your template as follows:
```html
<hou-ng-advncedIonicSelectList
  [items]="items"
  [selectedItems]="selectedItems"
  [title]="'Select Items'"
  [multipe]="true"
  [isOpen]="isModalOpen"
  [cancelTxt]="'Cancel'"
  [confirmTxt]="'Confirm'"
  [text]="'name'"
  [value]="'value'"
  (selectionCancel)="onSelectionCancel()"
  (selectionChange)="onSelectionChange($event)"
></hou-ng-advncedIonicSelectList>
```

# Component Inputs
items: any[] - An array of items to be displayed in the select list.
selectedItems: any[] - An array of items that are initially selected.
title: string - The title of the modal.
multipe: boolean - Whether multiple selections are allowed (default is false).
isOpen: boolean - Whether the modal is open or not.
cancelTxt: string - The text for the cancel button (default is 'Cancel').
confirmTxt: string - The text for the confirm button (default is 'Confirm').
text: string - The property name in the items array that should be used for display text in the list.
value: string - The property name in the items array that should be used for the value of each item.

# Component Outputs
selectionCancel: EventEmitter<void> - Emitted when the cancel button is clicked.
selectionChange: EventEmitter<any[]> - Emitted when the confirm button is clicked with the selected items.

## Example
Here's a complete example of how you might use this component in your Angular app.

# app.component.ts
```ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  items = [
    { id: 1, name: 'Item 1', description: 'desc 1' },
    { id: 2, name: 'Item 2', description: 'desc 2' },
    { id: 3, name: 'Item 3', description: 'desc 3' }
  ];
  
  selectedItems = [];
  isModalOpen = false;

  onSelectionCancel() {
    this.isModalOpen = false;
  }

  onSelectionChange(selectedItems: any[]) {
    this.selectedItems = selectedItems;
    this.isModalOpen = false;
  }

  openModal() {
    this.isModalOpen = true;
  }
}
```

# app.component.html
```html
<ion-button (click)="openModal()">Open Select List</ion-button>

<hou-ng-advncedIonicSelectList
  [items]="items"
  [selectedItems]="selectedItems"
  [title]="'Select Items'"
  [multipe]="true"
  [isOpen]="isModalOpen"
  [cancelTxt]="'Cancel'"
  [confirmTxt]="'Confirm'"
  [text]="'name'"
  [value]="'description'"
  (selectionCancel)="onSelectionCancel()"
  (selectionChange)="onSelectionChange($event)"
></hou-ng-advncedIonicSelectList>
```
