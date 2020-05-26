import { Injectable } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class QrService {
  private resultado = new Subject<string>();
  private salir = new Subject<void>();
  private desuscribir = new Subject<void>();

  // https://blog.angulartraining.com/rxjs-subjects-a-tutorial-4dcce0e9637f

  constructor(private qrScanner: QRScanner) { }

  public escanear(): void {
    // Optionally request the permission early
    this.qrScanner.prepare()
    .then((status: QRScannerStatus) => {
      if (status.authorized) {
        // camera permission was granted

        this.qrScanner.show();
        // start scanning
        /*const scanSub = */
        this.qrScanner.scan()
        .pipe(takeUntil(this.desuscribir))
        .subscribe((text: string) => {
          // console.log('Scanned something', text);
          // alert(text);
          this.qrScanner.hide(); // hide camera preview
          // scanSub.unsubscribe(); // stop scanning

          this.desuscribir.next();
          this.desuscribir.complete();
          this.resultado.next(text);
          this.salir.next();
        });

        // this.qrScanner.show();
      } else if (status.denied) {
        // camera permission was permanently denied
        // you must use QRScanner.openSettings() method to guide the user to the settings page
        // then they can grant the permission from there
      } else {
        // permission was denied, but not permanently. You can ask for permission again at a later time.
      }
    })
    .catch((e: any) => alert(e.name) /*console.log('Error: ', e)*/);
  }

  public getResultado(): Observable<string> {
    return this.resultado.asObservable();
  }

  public getSalir(): Observable<void> {
    return this.salir.asObservable();
  }
}
