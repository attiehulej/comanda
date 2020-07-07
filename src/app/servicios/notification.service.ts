import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { UtilsService } from 'src/app/servicios/utils.service';
import { Notificacion } from 'src/app/clases/notificacion';
import { TipoUsuario } from '../enums/tipo-usuario.enum';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(public db: AngularFirestore,
    private utilsService: UtilsService,
    private firebaseService: FirebaseService) { }

  activarNotificaiones(tipoDeUsuario : TipoUsuario)
  {
    this.db.collection('notificaciones').snapshotChanges().subscribe(data => this.verficarNotificaciones(tipoDeUsuario, data));
  }

  verficarNotificaciones(tipoDeUsuario : TipoUsuario, datos)
  {
    let notificaciones = datos.map((a: any) => {
      const data = a.payload.doc.data();
      data.id = a.payload.doc.id;
      return data;
    });
    for (const aux of notificaciones) 
    {
      let notificacion : Notificacion = aux;
      if(notificacion.receptor == tipoDeUsuario && notificacion.firstApparition)
      {
        this.lanzarNotificacion(notificacion, tipoDeUsuario);
      } 
    }
  }

  lanzarNotificacion(notificacion : Notificacion, tipoDeUsuario : TipoUsuario)
  {
    let mensaje : string = "";
    notificacion.firstApparition = false; //SE LO PONE EN FALSE PARA QUE NO VUELVA A APARECER
    this.actualizarNotificacion(notificacion).then(data => {
      switch(tipoDeUsuario)
      {
        case TipoUsuario.COCINERO:
          mensaje = "COCINERO nueva notificacion";
          break;
        case TipoUsuario.BARTENDER:
          mensaje = "BARTENDER nueva notificacion";
          break;
        case TipoUsuario.MOZO:
          mensaje = "MOZO nueva notificacion";
          break;
      }
      console.log("Notificacion id = " + notificacion.id + " idPedido = " + notificacion.idPedido);
      this.utilsService.presentToast(mensaje, "toast-info");
    });
  }

  crearNotificacion(notificacion: Notificacion) 
  {
    return this.firebaseService.addDoc('notificaciones', Object.assign({}, notificacion)).then(data => {
      notificacion.id = data.id;
      this.actualizarNotificacion(notificacion);
    });
  }

  actualizarNotificacion(notificacion: Notificacion) 
  {
    notificacion.fechaModificado = new Date();
    return this.firebaseService.updateDoc('notificaciones', notificacion.id, Object.assign({}, notificacion));
  }

  borrarNotificacion(notificacion: Notificacion)
  {
    notificacion.fechaBaja = new Date();
    return this.firebaseService.updateDoc('notificaciones', notificacion.id, Object.assign({}, notificacion));
  }
}
