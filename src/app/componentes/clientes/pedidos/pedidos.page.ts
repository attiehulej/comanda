import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { Pedido } from 'src/app/clases/pedido';
import { Usuario } from 'src/app/clases/usuario';
import { ChatComponent } from '../../chat/chat.component';
import { ListaProductoPage } from './lista-producto/lista-producto.page';
import { PedidoDetallePage } from './pedido-detalle/pedido-detalle.page';
import { EstadoPedido } from 'src/app/enums/estado-pedido.enum';

@Component({
  selector: 'app-pedidos',
  templateUrl: './pedidos.page.html',
  styleUrls: ['./pedidos.page.scss'],
})
export class PedidosPage implements OnInit {

  usuario: Usuario;
  pedido: Pedido;

  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.obtenerPedido();
      });
    });
  }

  obtenerPedido() {
    this.utilsService.presentLoading();
    this.pedidoService.obtenerPedidosActivos(this.usuario).subscribe(pedidos => {
      this.utilsService.dismissLoading();
      if (pedidos && pedidos.length > 0) { // Si tiene pedidos en cursos
        this.pedido = pedidos[0];
      }
    });
  }

  agregarComida() {
    this.utilsService.presentModal(ListaProductoPage, { pedido: this.pedido });
  }

  verDetalle() {
    const callback = (p: Pedido) => this.pagarPedido(p);
    this.utilsService.presentModal(PedidoDetallePage, { pedido: this.pedido, callback });
  }

  pagarPedido(pedido: Pedido) {
    pedido.estado = EstadoPedido.PAGANDO;
    this.utilsService.presentLoading();
    this.pedidoService.actualizarPedido(pedido).finally(() => {
      this.utilsService.dismissLoading();
      this.utilsService.presentToast('Procesando pago con el mozo...', 'toast-info');
    });
  }

  atras(): void {
    this.utilsService.showLoadingAndNavigate('clientes');
  }

  calcularTotal() {
    return this.pedido?.productos.reduce((a, b) => a + b.cantidad * b.producto.precio, 0);
  }

  chatear(destinatario: string) {
    this.utilsService.presentModal(ChatComponent, { pedido: this.pedido, receptor: destinatario, user: this.usuario });
  }

}
