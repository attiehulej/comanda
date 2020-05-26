import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class SpinnerService {

  constructor(private loadingController: LoadingController) { }

  async cargarEspera(ms: number) {
    const loading = await this.loadingController.create({
      message: 'Espere por favor',
      spinner: 'crescent'
    });
    await loading.present()
    .then(() => this.delay(ms));
  }

  async quitarEspera() {
    await this.loadingController.dismiss();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: null,
      duration: 5000,
      message: 'Click the backdrop to dismiss early...',
      translucent: true,
      cssClass: 'custom-class custom-loading',
      backdropDismiss: true
    });
    await loading.present();
  }

  private delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms));
  }
}
