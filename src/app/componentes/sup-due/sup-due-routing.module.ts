import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SupDuePage } from './sup-due.page';

const routes: Routes = [
  {
    path: '',
    component: SupDuePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupDuePageRoutingModule {}
