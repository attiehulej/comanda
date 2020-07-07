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
    this.db.collection('notificaciones').snapshotChanges().subscribe(data => this.lanzarNotificacion(tipoDeUsuario, data));
  }

  lanzarNotificacion(tipoDeUsuario : TipoUsuario, datos)
  {
    let mensaje : string = "";
    let notificacion = datos.map((a: any) => {
      const data = a.payload.doc.data();
      data.id = a.payload.doc.id;
      return data;
    });
    console.log(tipoDeUsuario);
    if(notificacion[0].receptor == tipoDeUsuario)
    {
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
      this.utilsService.presentToast(mensaje, "toast-info");
    }
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
