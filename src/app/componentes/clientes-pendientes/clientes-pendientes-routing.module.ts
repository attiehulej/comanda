import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClientesPendientesPage } from './clientes-pendientes.page';

const routes: Routes = [
  {
    path: '',
    component: ClientesPendientesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesPendientesPageRoutingModule {}
