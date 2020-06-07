import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/internal/operators/map';
import { Producto } from '../clases/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene todos los productos
  obtenerProductos() {
    return this.firebaseService.getDocs('productos').pipe(
      map(prod => {
        return prod.map(a => {
          const data = a.payload.doc.data() as Producto;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtener producto por id (id)
  obtenerProducto(uid: string) {
    return this.firebaseService.getDoc('productos', uid).pipe(
      map((prod: any) => {
        const data = prod.payload.data() as Producto;
        const id = uid;
        return { id, ...data };
      })
    );
  }

  // Crear producto (Class Producto)
  crearProducto(prod: Producto) {
    return this.firebaseService.addDoc('productos', Object.assign({}, prod));
  }

  // Actualizar productos (id y Class Producto)
  actualizarProducto(id: string, prod: Producto) {
    return this.firebaseService.updateDoc('productos', id, Object.assign({}, prod));
  }

  // Borrar producto (id)
  borrarProducto(id: string) {
    return this.firebaseService.deleteDoc('productos', id);
  }
}
