import { Injectable } from '@angular/core';
import { FirebaseService } from './firebase.service';
import { Usuario } from 'src/app/clases/usuario';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(private firebaseService: FirebaseService) { }

  // Obtiene todos los usuarios activos
  obtenerUsuarios() 
  {
    return this.firebaseService.getDocs('usuarios').pipe(
      map(users => {
        return users.map(a => {
          const data = a.payload.doc.data() as Usuario;
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  // Obtener usuario por id (id)
  obtenerUsuario(uid: string) 
  {
    return this.firebaseService.getDoc('usuarios', uid).pipe(
      map((user: any) => {
        const data = user.payload.data() as Usuario;
        const id = uid;
        return { id, ...data };
      })
    );
  }

  // Crear usuario (Class Usuario)
  crearUsuario(id: string, usr: Usuario) 
  {
    return this.firebaseService.addDoc2('usuarios', id, Object.assign({}, usr));
  }

  // Actualizar usuario (id y Class Usuario)
  actualizarUsuario(id: string, usr: Usuario) 
  {
    return this.firebaseService.updateDoc('usuarios', id, Object.assign({}, usr));
  }

  // Borrar usuario (id)
  borrarUsuario(id: string) 
  {
    return this.firebaseService.deleteDoc('usuarios', id);
  }
}
