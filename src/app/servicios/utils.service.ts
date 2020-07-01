import { Injectable } from '@angular/core';
import {
  ToastController,
  LoadingController,
  AlertController,
  ActionSheetController
} from '@ionic/angular';
import { Router } from '@angular/router';
import { FIREBASE_MENSAJES } from '../enums/firebase-errores';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  loader: any;
  isLoading = false;
  constructor(
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    private actionSheetCtrl: ActionSheetController,
    private router: Router
  ) { }

  // Toast & Alerts

  async presentAlert(header: string, sub: string, msg: string) {
    const alert = await this.alertCtrl.create({
      header,
      subHeader: sub,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentToast(message, cssClass) {
    const toast = await this.toastCtrl.create({
      message,
      duration: 4000,
      position: 'top',
      animated: true,
      cssClass
    });
    await toast.present();
  }
  // FIN Toast & Alerts

  // Loadings

  async presentLoading() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: null,
      message: '<img src="../assets/spinner.png" class="loader">',
      cssClass: 'custom-loading',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async presentLoadingAuto(time?) {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      spinner: null,
      duration: time || 2000,
      message: '<img src="../assets/spinner.png" class="loader">',
      cssClass: 'custom-loading',
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async showLoadingAndNavigate(route: string) {
    await this.presentLoadingAuto();
    this.router.navigate([route]);
  }

  async dismissLoading() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

  // FIN Loadings

  // Errors
  async handleError(error, isFirebase = false): Promise<void> {
    if (isFirebase) { this.localizeErrorMap(error); }
    console.log(error);
    const alert = await this.alertCtrl.create({
      message: error.message,
      buttons: [{
        text: 'Ok',
        role: 'cancel'
      }]
    });
    await alert.present();
  }
  // FIN Errors

  // ActionSheets
  async presentActionsheet(data) {
    const actionSheet = await this.actionSheetCtrl.create(data);
    await actionSheet.present();
  }
  // FIN ActionSheets

  // Firebase errores
  localizeErrorMap(e?: Error & { code?: string }): Error {
    if (typeof e === 'object' && typeof e.code === 'string' && e.code in FIREBASE_MENSAJES) {
      e.message = (FIREBASE_MENSAJES as any)[e.code];
    }
    return e;
  }
}
