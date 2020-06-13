import { Component, OnInit, OnDestroy } from '@angular/core';
// import { Router } from '@angular/router';
import { Location } from '@angular/common';
//import { QrService } from '../../servicios/qr.service';
import { VibrationService } from '../../servicios/vibration.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.component.html',
  styleUrls: ['./qr.component.scss'],
})
export class QrComponent implements OnInit, OnDestroy {
  private desuscribir = new Subject<void>();

  constructor(
    //private qr: QrService,
    // private router: Router,
    private location: Location,
    private vibration: VibrationService
  ) {}

  ngOnInit() {
    /*
    this.qr.getSalir()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(() => {
      this.vibration.vibrar(100);
      // this.router.navigate(['principal']);
      this.location.back();
    });
    this.qr.escanear();
    */
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
  }
}
