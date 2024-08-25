import { NgModule } from '@angular/core';
import { AdvancedIonicSelectListComponent } from './advanced-ionic-select-list.component';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AdvancedIonicSelectListComponent
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule
  ],
  exports: [
    AdvancedIonicSelectListComponent
  ]
})
export class AdvancedIonicSelectListModule { }
