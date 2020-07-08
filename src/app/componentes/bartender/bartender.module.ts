import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { BartenderPageRoutingModule } from './bartender-routing.module';
import { BartenderPage } from './bartender.page';
import { ToolbarModule } from '../toolbar/toolbar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BartenderPageRoutingModule,
    ToolbarModule 
  ],
  declarations: [BartenderPage]
})
export class BartenderPageModule {}
