import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { Pedido } from '../../clases/pedido';
import { Usuario } from '../../clases/usuario';
import { PedidoService } from '../../servicios/pedido.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {
  @ViewChild(IonContent, { static: true }) content: IonContent;
  @Input() pedido: Pedido;
  @Input() receptor: string;
  @Input() user: Usuario;
  public msg: string;
  index = null;

  constructor(
    private pedidos: PedidoService,
    private modal: ModalController
  ) { }

  ngOnInit() {
  }

  closeModal() {
    this.modal.dismiss();
  }

  sendMensaje() {
    if (this.msg.trim() !== '') {
      const message = {
        text: this.msg,
        created_at: new Date(),
        user: {
          id: this.user.id,
          nombre: this.user.nombre
        },
        destinatario: this.receptor
      };
      if (!this.pedido.mensajes) {
        this.pedido.mensajes = [];
      }
      this.pedido.mensajes.push(message);
      this.content.scrollToBottom(0);
      this.pedidos.actualizarPedido(this.pedido.id, this.pedido);
      this.msg = '';
    }
  }

  updateScroll(index: any) {
    if (index !== this.index) {
      this.index = index;
      setTimeout(() => {
        this.content.scrollToBottom(0);
      }, 1000);
    }
  }

  getFecha(fecha: any) {
    return fecha instanceof Date ? fecha : fecha.toDate();
  }
}
