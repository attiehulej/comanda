import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SupDuePageRoutingModule } from './sup-due-routing.module';

import { SupDuePage } from './sup-due.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SupDuePageRoutingModule
  ],
  declarations: [SupDuePage]
})
export class SupDuePageModule {}
