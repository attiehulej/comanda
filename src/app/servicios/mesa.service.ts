import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { map } from 'rxjs/internal/operators/map';
import { Mesa } from '../clases/mesa';

@Injectable({
  providedIn: 'root'
})
export class MesaService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene todas las mesas
  obtenerMesas() {
    return this.firebaseService.getDocs('mesas').pipe(
      map(mesas => {
        return mesas.map(a => {
          const data = a.payload.doc.data() as Mesa;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtener mesa por id (id)
  obtenerMesa(uid: string) {
    return this.firebaseService.getDoc('mesas', uid).pipe(
      map((mesa: any) => {
        const data = mesa.payload.data() as Mesa;
        const id = uid;
        return { id, ...data };
      })
    );
  }

  // Crear Mesa (Class Mesa)
  crearMesa(mesa: Mesa) {
    return this.firebaseService.addDoc('mesas', Object.assign({}, mesa));
  }

  // Actualizar mesas (id y Class Mesa)
  actualizarMesa(id: string, mesa: Mesa) {
    return this.firebaseService.updateDoc('mesas', id, Object.assign({}, mesa));
  }

  // Borrar Mesa (id)
  borrarMesa(id: string) {
    return this.firebaseService.deleteDoc('mesas', id);
  }
}
