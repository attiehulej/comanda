import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerRouterService } from '../../servicios/spinner-router.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CameraService } from '../../servicios/camera.service';
import { QrService } from '../../servicios/qr.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Producto } from '../../clases/producto';

@Component({
  selector: 'app-carga-producto',
  templateUrl: './carga-producto.component.html',
  styleUrls: ['./carga-producto.component.scss'],
})
export class CargaProductoComponent implements OnInit, OnDestroy {
  public formProducto: FormGroup;
  private desuscribir = new Subject<void>();
  private producto: Producto = new Producto();

  constructor(
    public spinnerRouter: SpinnerRouterService,
    private fb: FormBuilder,
    public camara: CameraService,
    private qr: QrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formProducto = this.fb.group({
      codigo: ['', [Validators.required]],
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      descripcion: ['', [Validators.required]],
      tiempoPromedio: ['', [Validators.required, Validators.min(0)]],
      precio: ['', [Validators.required, Validators.min(0)]],
      // foto: ['', [Validators.required]],
      qr: ['', [Validators.required]]
    });

    this.qr.getResultado()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(nuevoQr => this.formProducto.controls.qr.setValue(nuevoQr));
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
    this.camara.limpiarFotos();
  }

  public volverHome(): void {
    this.spinnerRouter.showSpinnerAndNavigate('home', 'loadingContainerProducto', 2000);
  }

  public tomarFoto(): void {
    this.camara.tomarFoto();
  }

  public cargarQr(): void {
    this.router.navigate(['qr']);
  }

  onSubmitProducto(): void {
    if (this.formProducto.valid) {
      this.producto.codigo = this.formProducto.controls.codigo.value;
      this.producto.nombre = this.formProducto.controls.nombre.value;
      this.producto.descripcion = this.formProducto.controls.descripcion.value;
      this.producto.tiempoPromedio = this.formProducto.controls.tiempoPromedio.value;
      this.producto.precio = this.formProducto.controls.precio.value;
      // this.producto.foto = ....
      this.producto.qr = this.formProducto.controls.qr.value;
      alert('Envío Producto');
    } else {
      alert('Error en formulario');
      this.formProducto.markAllAsTouched();
    }
  }

  public mostrarError(control: string): string {
    let retorno = '';

    switch (control) {
      case 'codigo':
        if (this.formProducto.controls.codigo.hasError('required')) {
          retorno = 'Debe ingresar un código para el producto';
        } else {
          retorno = 'Error inesperado con el código del producto';
        }
        break;
      case 'nombre':
        if (this.formProducto.controls.nombre.hasError('required')) {
          retorno = 'Debe ingresar un nombre para el producto';
        } else if (this.formProducto.controls.nombre.hasError('minlength')) {
          retorno = 'Debe ingresar al menos 3 caracteres para el nombre';
        } else {
          retorno = 'Error inesperado con el nombre del producto';
        }
        break;
      case 'descripcion':
        if (this.formProducto.controls.descripcion.hasError('required')) {
          retorno = 'Debe ingresar una descripción para el producto';
        } else {
          retorno = 'Error inesperado con el descripción del producto';
        }
        break;
      case 'tiempoPromedio':
        if (this.formProducto.controls.tiempoPromedio.hasError('required')) {
          retorno = 'Debe ingresar el tiempo promedio de preparación';
        } else if (this.formProducto.controls.tiempoPromedio.hasError('min')) {
          retorno = 'No se admiten valores negativos';
        } else {
          retorno = 'Error inesperado con el tiempo promedio de preparación';
        }
        break;
      case 'precio':
        if (this.formProducto.controls.precio.hasError('required')) {
          retorno = 'Debe ingresar el precio del producto';
        } else if (this.formProducto.controls.precio.hasError('min')) {
          retorno = 'No se admiten valores negativos';
        } else {
          retorno = 'Error inesperado con el precio del producto';
        }
        break;
      case 'qr':
        if (this.formProducto.controls.qr.hasError('required')) {
          retorno = 'Debe ingresar el código QR de la producto';
        } else {
          retorno = 'Error inesperado con el código QR de la producto';
        }
        break;
    }

    return retorno;
  }
}
