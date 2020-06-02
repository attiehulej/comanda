import { Injectable } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { Foto } from '../clases/foto';

@Injectable({
  providedIn: 'root'
})
export class CameraService {
  public fotos: Foto[] = [];

  constructor(
    private camera: Camera,
    private webview: WebView,
    private date: DatePipe
  ) { }

  private getOpciones(): CameraOptions {
    return {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
  }

  public tomarFoto(): void {
    this.camera.getPicture(this.getOpciones())
    .then(datos => {
      this.fotos.unshift({
        filepath: this.webview.convertFileSrc(datos),
        webviewPath: datos,
        fecha: Date.now(),
        name: this.date.transform(Date.now(), 'yyyyMMddHHmmSSS').concat('.jpg')
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  public limpiarFotos(): void {
    this.camera.cleanup();
    this.fotos.splice(0, this.fotos.length);
  }

  /*public async subirFotos(): Promise<void> {
    this.fotos.forEach(async foto => await this.storage.subirImagen(foto));
  }*/

  public getCantidad(): number {
    return this.fotos.length;
  }

  public getFotos(): Foto[] {
    return this.fotos;
  }
}
