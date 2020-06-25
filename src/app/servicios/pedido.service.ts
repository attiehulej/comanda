import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/internal/operators/map';
import { Pedido } from '../clases/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene todos los pedidos
  obtenerPedidos() {
    return this.firebaseService.getDocs('pedidos').pipe(
      map(prod => {
        return prod.map(a => {
          const data = a.payload.doc.data() as Pedido;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtener Pedido por id (id)
  obtenerPedido(uid: string) {
    return this.firebaseService.getDoc('pedidos', uid).pipe(
      map((prod: any) => {
        const data = prod.payload.data() as Pedido;
        const id = uid;
        return { id, ...data };
      })
    );
  }

  // Crear pedido (Class Pedido)
  crearPedido(prod: Pedido) {
    return this.firebaseService.addDoc('pedidos', Object.assign({}, prod));
  }

  // Actualizar pedidos (id y Class pedido)
  actualizarPedido(id: string, prod: Pedido) {
    return this.firebaseService.updateDoc('pedidos', id, Object.assign({}, prod));
  }

  // Borrar Pedido (id)
  borrarPedido(id: string) {
    return this.firebaseService.deleteDoc('pedidos', id);
  }
}