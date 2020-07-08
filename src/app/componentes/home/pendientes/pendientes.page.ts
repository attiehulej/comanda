import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { PedidoService } from 'src/app/servicios/pedido.service';
import { Pedido } from 'src/app/clases/pedido';
import { EstadoPedido } from 'src/app/enums/estado-pedido.enum';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { Sectores } from 'src/app/enums/sectores.enum';
import { Producto } from 'src/app/clases/producto';
import { Mesa } from 'src/app/clases/mesa';
import { EstadosMesa } from 'src/app/enums/estado-mesa.enum';
import { MesaService } from 'src/app/servicios/mesa.service';

@Component({
  selector: 'app-pendientes',
  templateUrl: './pendientes.page.html',
  styleUrls: ['./pendientes.page.scss'],
})
export class PendientesPage implements OnInit {
  usuario: any;
  pedidosPendientes: any;
  pedidosPagar: any;
  pedidosConfirmados: any;

  constructor(
    private utilsService: UtilsService,
    private authService: AuthService,
    private pedidoService: PedidoService,
    private mesaService: MesaService
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
      });
    });
  }

  ionViewWillEnter() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.obtenerPedidosPendiente();
        this.obtenerPedidosConfirmados();
        this.obtenerPedidosPorCobrar();
      });
    });
  }

  obtenerPedidosPendiente() {
    this.utilsService.presentLoading();
    this.pedidoService.obtenerPedidosPendientes().subscribe(pedidos => {
      this.utilsService.dismissLoading();
      if (pedidos) { // Si hay pedidos pendientes
        this.pedidosPendientes = pedidos;
        console.log(pedidos);
      }
    });
  }

  obtenerPedidosPorCobrar() {
    this.pedidoService.obtenerPedidosPorCobrar().subscribe(pedidos => {
      if (pedidos) { // Si hay pedidos por cobrar
        this.pedidosPagar = pedidos;
        console.log(pedidos);
      }
    });
  }

  obtenerPedidosConfirmados() {
    this.pedidoService.obtenerPedidosConfirmados().subscribe(pedidos => {
      if (pedidos) { // Si hay pedidos para entregar
        // Solo los no terminados
        this.pedidosConfirmados = pedidos;
        console.log(this.pedidosConfirmados);
      }
    });
  }

  validarSector(ped) {
    let ret = false;
    if (ped.terminado) {
      ret = false;
    } else {
      if (this.usuario.perfil === TipoUsuario.COCINERO) {
        if (ped.producto.sector === Sectores.COMIDAS || ped.producto.sector === Sectores.POSTRES) {
          ret = true;
        }
      }
      if (this.usuario.perfil === TipoUsuario.BARTENDER) {
        if (ped.producto.sector === Sectores.BEBIDAS) {
          ret = true;
        }
      }
    }
    return ret;
  }

  confirmarPedido(pedido: Pedido) {
    pedido.estado = EstadoPedido.CONFIRMADO;
    this.utilsService.presentLoading();
    this.pedidoService.actualizarPedido(pedido).finally(() => {
      this.utilsService.dismissLoading();
    });
  }

  cobrarPedido(pedido: Pedido) {
    // Cerramos el pedido
    pedido.estado = EstadoPedido.TERMINADO;
    this.utilsService.presentLoading();
    this.pedidoService.actualizarPedido(pedido).finally(() => {
      this.utilsService.dismissLoading();
    });
    // Liberamos la mesa
    // Actualizamos el estado de la mesa luego de crear el pedido
    const m = pedido.mesa as Mesa;
    m.estado = EstadosMesa.LIBRE;
    this.mesaService.actualizarMesa(m);
  }

  entregarProducto(pedido: Pedido, producto: Producto) {
    const prodIndex = pedido.productos.indexOf(producto);
    pedido.productos[prodIndex].entregado = true;
    // Si entregamos todos los productos, cambiamos el estado a entregado
    if (pedido.productos.every((x) => x.entregado)) {
      pedido.estado = EstadoPedido.ENTREGADO;
    }
    console.log(pedido);
    this.utilsService.presentLoading();
    this.pedidoService.actualizarPedido(pedido).finally(() => {
      this.utilsService.dismissLoading();
    });
  }

  terminarProducto(pedido: Pedido, producto: Producto) {
    const prodIndex = pedido.productos.indexOf(producto);
    pedido.productos[prodIndex].terminado = true;
    console.log(pedido);
    this.utilsService.presentLoading();
    this.pedidoService.actualizarPedido(pedido).finally(() => {
      this.utilsService.dismissLoading();
    });
  }

  atras(): void {
    this.utilsService.showLoadingAndNavigate('home');
  }

  calcularTotal(ped) {
    return ped.productos.reduce((a, b) => a + b.cantidad * b.producto.precio, 0);
  }
}
