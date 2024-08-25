import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

import { AdvancedIonicSelectListComponent } from './advanced-ionic-select-list.component';

describe('AdvancedIonicSelectListComponent', () => {
  let component: AdvancedIonicSelectListComponent;
  let fixture: ComponentFixture<AdvancedIonicSelectListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdvancedIonicSelectListComponent],
      imports: [IonicModule.forRoot(), FormsModule]  // Import necessary modules
    });
    fixture = TestBed.createComponent(AdvancedIonicSelectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();  // Trigger initial data binding
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });  

  it('should filter items based on search query', () => {
    component.items = [
      { id: "1", name: 'Item 1' },
      { id: "2", name: 'Item 2' },
      { id: "3", name: 'Another' }
    ];
    component.text = 'name';
    component.value = 'id';
    component.ngOnChanges();  // Manually trigger ngOnChanges to initialize items

    component.searchbarInput({ target: { value: 'Item' } });
    fixture.detectChanges();
    expect(component.filteredItems.length).toBe(2);
    expect(component.filteredItems).toEqual([
      { id: "1", name: 'Item 1' },
      { id: "2", name: 'Item 2' }
    ]);
  });

  it('should handle single selection correctly', () => {
    component.items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];
    component.text = 'name';
    component.value = 'id';
    component.multiple = false;
    component.ngOnChanges();

    component.checkboxChange({ detail: { checked: true, value: { id: 1, name: 'Item 1' } } });
    fixture.detectChanges();

    expect(component.workingSelectedValues).toEqual([{ id: 1, name: 'Item 1' }]);

    // Select another item
    component.checkboxChange({ detail: { checked: true, value: { id: 2, name: 'Item 2' } } });
    fixture.detectChanges();

    // Should only keep the last selected item
    expect(component.workingSelectedValues).toEqual([{ id: 2, name: 'Item 2' }]);
  });

  it('should handle multiple selections correctly', () => {
    component.items = [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ];
    component.text = 'name';
    component.value = 'id';
    component.multiple = true;
    component.ngOnChanges();

    component.checkboxChange({ detail: { checked: true, value: { id: 1, name: 'Item 1' } } });
    component.checkboxChange({ detail: { checked: true, value: { id: 2, name: 'Item 2' } } });
    fixture.detectChanges();

    expect(component.workingSelectedValues).toEqual([
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' }
    ]);
  });

  it('should emit selectionChange on confirmChanges', () => {
    spyOn(component.selectionChange, 'emit');

    component.workingSelectedValues = [{ id: 1, name: 'Item 1' }];
    component.confirmChanges();
    fixture.detectChanges();

    expect(component.selectionChange.emit).toHaveBeenCalledWith([{ id: 1, name: 'Item 1' }]);
  });
});
