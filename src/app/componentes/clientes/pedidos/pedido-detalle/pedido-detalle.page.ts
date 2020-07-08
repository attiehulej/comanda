import { Component, OnInit, Input } from '@angular/core';
import { Pedido } from 'src/app/clases/pedido';
import { ModalController } from '@ionic/angular';
import { ProductoService } from 'src/app/servicios/producto.service';

@Component({
  selector: 'app-pedido-detalle',
  templateUrl: './pedido-detalle.page.html',
  styleUrls: ['./pedido-detalle.page.scss'],
})
export class PedidoDetallePage implements OnInit {

  @Input() pedido: Pedido;

  constructor(
    private modalCtrl: ModalController,
    private productoService: ProductoService
  ) { }

  ngOnInit() {
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

  calcularTotal() {
    return this.pedido.productos.reduce((a, b) => a + b.cantidad * b.producto.precio, 0);
  }
}
