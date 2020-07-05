import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {

  usuario: Usuario = null;
  pedidosActivos: any;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.obtenerPedidosActivos();
      });
    });
  }

  ionViewWillEnter() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
      });
    });
  }

  obtenerPedidosActivos() {
    this.utilsService.presentLoading();
    this.pedidoService.obtenerPedidosActivos(this.usuario).subscribe(datos => {
      this.utilsService.dismissLoading();
      this.pedidosActivos = datos;
      console.log(datos);
    });
  }

  logOut(): void {
    this.authService.logout();
    this.utilsService.showLoadingAndNavigate('inicio');
  }

  irListaEspera(): void {
    this.utilsService.showLoadingAndNavigate('clientes/lista-espera');
  }

  irPedidoActivo(): void {
    this.utilsService.showLoadingAndNavigate('clientes/pedidos');
  }

}
