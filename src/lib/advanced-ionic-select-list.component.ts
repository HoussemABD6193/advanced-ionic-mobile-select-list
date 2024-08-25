import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';

@Component({
  selector: 'hou-ng-AdvancedIonicSelectList',
  template: `
    <ion-modal [isOpen]="isOpen">
      <ng-template>
        <ion-header>
          <ion-toolbar>
            <ion-buttons slot="start">
              <ion-button (click)="cancelChanges()">{{
                cancelTxt
              }}</ion-button>
            </ion-buttons>
            <ion-title style="text-align: center;">{{ title }}</ion-title>
            <ion-buttons slot="end">
              <ion-button (click)="confirmChanges()">{{
                confirmTxt
              }}</ion-button>
            </ion-buttons>
          </ion-toolbar>
          <ion-toolbar>
            <ion-searchbar
              mode="ios"
              (ionInput)="searchbarInput($event)"
            ></ion-searchbar>
          </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
          <ion-list [inset]="true">
            <ion-item *ngFor="let item of filteredItems; trackBy: trackItems">
              <ion-checkbox
                [value]="item"
                [checked]="isChecked(item)"
                (ionChange)="checkboxChange($event)"
              >
                <div>
                  <strong>{{ item?.[text] }}</strong>
                  <p>{{ item?.[value] }}</p>
                </div>
              </ion-checkbox>
            </ion-item>
          </ion-list>
        </ion-content>
      </ng-template>
    </ion-modal>
  `,
  styles: [],
})
export class AdvancedIonicSelectListComponent implements OnChanges {
  @Input() items: { [key: string]: any }[] = [];
  @Input() selectedItems: { [key: string]: any }[] = [];
  @Input() title = 'Select Items';
  @Input() multiple  = false;
  @Input() isOpen = false;
  @Input() text = '';
  @Input() value = '';

  @Output() selectionCancel = new EventEmitter<void>();
  @Output() selectionChange = new EventEmitter<any[]>();

  filteredItems: any[] = [];
  workingSelectedValues: any[] = [];
  cancelTxt = 'Cancel';
  confirmTxt = 'Confirm';

  ngOnChanges() {
    this.filteredItems = [...this.items];
    this.workingSelectedValues = [...this.selectedItems];
  }

  getValue(item: any) {
    return item?.[this.value];
  }

  trackItems(index: number, item: any) {
    return item.value;
  }

  cancelChanges() {
    this.selectionCancel.emit();
    this.isOpen = false;
  }

  confirmChanges() {
    this.selectionChange.emit(this.workingSelectedValues);
  }

  searchbarInput(ev: any) {
    this.filterList(ev.target.value);
  }

  /**
   * Update the rendered view with
   * the provided search query. If no
   * query is provided, all data
   * will be rendered.
   */
  filterList(searchQuery: string | undefined) {
    /**
     * If no search query is defined,
     * return all options.
     */
    if (searchQuery === undefined) {
      this.filteredItems = [...this.items];
    } else {
      /**
       * Otherwise, normalize the search
       * query and check to see which items
       * contain the search query as a substring.
       */
      const normalizedQuery = searchQuery.toLowerCase();
      this.filteredItems = this.items.filter((item) => {
        return (
          item?.[this.text]?.toLowerCase().includes(normalizedQuery) ||
          item?.[this.value]?.toLowerCase().includes(normalizedQuery)
        );
      });
    }
  }

  isChecked(element: any) {
    return this.workingSelectedValues.find(
      (item) => item?.[this.value] === element?.[this.value]
    );
  }

  checkboxChange(ev: any) {
    const { checked, value } = ev.detail;

    if (checked) {
      if (this.multiple ) {
        this.workingSelectedValues = [...this.workingSelectedValues, value];
      } else {
        this.workingSelectedValues = [value];
      }
    } else {
      this.workingSelectedValues = this.workingSelectedValues.filter(
        (item: any) => item.value !== value.value
      );
    }
  }
}
