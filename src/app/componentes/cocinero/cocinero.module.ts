import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CocineroPageRoutingModule } from './cocinero-routing.module';
import { CocineroPage } from './cocinero.page';
import { ToolbarModule } from '../toolbar/toolbar.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CocineroPageRoutingModule,
    ToolbarModule 
  ],
  declarations: [CocineroPage]
})
export class CocineroPageModule {}
