import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import 'firebase/auth';
import { UsuarioService } from './usuario.service';
import { Usuario } from '../clases/usuario';
import { EstadoUsuario } from '../enums/estado-usuario.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    public afAuth: AngularFireAuth,
    public usuarioService: UsuarioService,
  ) { }

  currentUser() {
    return this.afAuth.currentUser;
  }

  signUp(usuario: Usuario) {
    return new Promise<any>((resolve, reject) => {
      let call = this.afAuth.signInAnonymously();
      if (usuario.estado !== EstadoUsuario.ANONIMO) {
        call = this.afAuth.createUserWithEmailAndPassword(usuario.correo, usuario.clave);
      }
      call.then(
        (response: any) => {
          if (response) {
            this.usuarioService.crearUsuario(usuario).then((usr: any) => resolve(this.obtenerDetalle(usr)));
          }
        },
        (error: any) => reject(error));
    });
  }

  signIn(obj) {
    return new Promise<any>((resolve, reject) => {
      this.afAuth.signInWithEmailAndPassword(obj.correo, obj.clave)
        .then(
          (response: any) => {
            resolve(this.obtenerDetalle(response.user));
          },
          (error: any) => reject(error));
    });
  }


  logout() {
    return this.afAuth.signOut();
  }

  obtenerDetalle(usuario: Usuario) {
    return this.usuarioService.obtenerUsuario(usuario.id);
  }

  gestionarUsuario(usuario: Usuario, action: EstadoUsuario) {
    usuario.estado = action;

    return this.usuarioService.actualizarUsuario(usuario.id, usuario).then((usr) => {
      console.log('Documento actualizado exitósamente!' + usr);
    }, error => console.log(error));
  }

}
