import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { CargaMesaComponent } from './componentes/carga-mesa/carga-mesa.component';
import { QrComponent } from './componentes/qr/qr.component';
import { CargaProductoComponent } from './componentes/carga-producto/carga-producto.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'cargaMesa', component: CargaMesaComponent}, // PATO
  { path: 'cargaProducto', component: CargaProductoComponent}, // PATO
  { path: 'qr', component: QrComponent}, // PATO
  { path: '', redirectTo: 'splash', pathMatch: 'full'},
  { path: 'splash', loadChildren: () => import('./app.component').then( m => m.AppComponent)},
  { path: 'login', loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule)},
  { path: 'alta-usuarios', loadChildren: () => import('./componentes/alta-usuarios/alta-usuarios.module').then( m => m.AltaUsuariosPageModule)},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
