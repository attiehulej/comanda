import { Component, OnInit, Input } from '@angular/core';
import { Producto } from '../../clases/producto';
import { CameraService } from '../../servicios/camera.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.scss'],
})
export class DetalleProductoComponent implements OnInit {
  @Input() producto: Producto;
  public fotoActual = 0;

  constructor(
    private camara: CameraService
  ) { }

  ngOnInit() {}

  public base64ToImg(num: number): string {
    return this.producto.fotos[num] ? this.camara.base64ToImg(this.producto.fotos[num]) : '';
  }

  public getFotoActual(): number {
    return this.fotoActual;
  }

  public irFotoAnt(): void {
    if (this.fotoActual > 0) {
      this.fotoActual--;
    }
  }

  public irFotoSig(): void {
    if (this.fotoActual < this.producto.fotos.length - 1) {
      this.fotoActual++;
    }
  }
}
