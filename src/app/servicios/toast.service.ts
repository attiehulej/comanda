import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  // toast: HTMLIonToastElement = null;
  // private mensajes: string[] = [];

  constructor(private toastCtrl: ToastController) { }

  async presentToast(text: string): Promise<void> {
      const toastData = {
          message: text,
          duration: 3000,
          color: 'danger',
          position: 'top'
      };

      await this.showToast(toastData);
  }

  async presentToastOk(text: string): Promise<void> {
      const toastData = {
          message: text,
          duration: 3000,
          color: 'success',
          position: 'top'
      };

      await this.showToast(toastData);
  }

  async presentClosableToast(text: string): Promise<void> {
      const toastData = {
          message: text,
          color: 'danger',
          showCloseButton: true,
          closeButtonText: 'X',
          position: 'top'
      };

      await this.showToast(toastData);
  }

  private async showToast(data: any): Promise<void> {
    // this.toast ? this.toast.dismiss() : false;
    // Espera hasta que el mensaje anterior se haya cerrado. Para encolar los siguientes.
    // while (this.toast != null) { }

    const mensaje = await this.toastCtrl.create(data);
    await mensaje.present();
  }
}
