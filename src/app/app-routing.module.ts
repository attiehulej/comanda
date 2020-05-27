import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)},
  { path: 'sup-due', loadChildren: () => import('./componentes/sup-due/sup-due.module').then( m => m.SupDuePageModule)},
  { path: 'empleados', loadChildren: () => import('./componentes/empleados/empleados.module').then( m => m.EmpleadosPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
