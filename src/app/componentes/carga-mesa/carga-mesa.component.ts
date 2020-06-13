import { Component, OnInit, OnDestroy } from '@angular/core';
import { SpinnerRouterService } from '../../servicios/spinner-router.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TipoMesa } from '../../enums/tipo-mesa.enum';
import { CameraService } from '../../servicios/camera.service';
//import { QrService } from '../../servicios/qr.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Mesa } from '../../clases/mesa';

@Component({
  selector: 'app-carga-mesa',
  templateUrl: './carga-mesa.component.html',
  styleUrls: ['./carga-mesa.component.scss'],
})
export class CargaMesaComponent implements OnInit, OnDestroy {
  public formMesa: FormGroup;

  // https://stackoverflow.com/questions/56036446/typescript-enum-values-as-array
  // https://stackoverflow.com/questions/35546421/how-to-get-a-variable-type-in-typescript
  public tipoMesa = Object.values(TipoMesa).filter(unTipo => typeof unTipo === 'string');
  private desuscribir = new Subject<void>();
  private mesa: Mesa = new Mesa();

  constructor(
    public spinnerRouter: SpinnerRouterService,
    private fb: FormBuilder,
    public camara: CameraService,
    //private qr: QrService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formMesa = this.fb.group({
      numeroMesa: ['', [Validators.required, Validators.min(1)]],
      cantidadComensales: ['', [Validators.required, Validators.min(2)]],
      tipoMesa: ['', [Validators.required]],
      // foto: ['', [Validators.required]],
      qr: ['', [Validators.required]]
    });

    /*
    this.qr.getResultado()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(nuevoQr => this.formMesa.controls.qr.setValue(nuevoQr));
    */
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
    //this.camara.limpiarFotos(); //NO EXISTE EL METODO
  }

  public volverHome(): void {
    this.spinnerRouter.showSpinnerAndNavigate('home', 'loadingContainerMesa', 2000);
  }

  public tomarFoto(): void {
    this.camara.tomarFoto();
  }

  public cargarQr(): void {
    this.router.navigate(['qr']);
  }

  onSubmitMesa(): void {
    if (this.formMesa.valid) {
      this.mesa.numero = this.formMesa.controls.numeroMesa.value;
      this.mesa.cantidad = this.formMesa.controls.cantidadComensales.value;
      this.mesa.tipo = this.formMesa.controls.tipoMesa.value;
      // this.mesa.foto = ....
      alert('Envío Mesa');
    } else {
      alert('Error en formulario');
      this.formMesa.markAllAsTouched();
    }
  }

  public mostrarError(control: string): string {
    let retorno = '';

    switch (control) {
      case 'numeroMesa':
        if (this.formMesa.controls.numeroMesa.hasError('required')) {
          retorno = 'Debe ingresar un número de mesa';
        } else if (this.formMesa.controls.numeroMesa.hasError('min')) {
          retorno = 'Solamente se admiten números positivos';
        } else {
          retorno = 'Error inesperado con el número de mesa';
        }
        break;
      case 'cantidadComensales':
        if (this.formMesa.controls.cantidadComensales.hasError('required')) {
          retorno = 'Debe ingresar la cantidad de comensales admitidos';
        } else if (this.formMesa.controls.cantidadComensales.hasError('min')) {
          retorno = 'El mínimo de comensales es 2';
        } else {
          retorno = 'Error inesperado con la cantidad de comensales';
        }
        break;
      case 'tipoMesa':
        if (this.formMesa.controls.tipoMesa.hasError('required')) {
          retorno = 'Debe ingresar el tipo de mesa';
        } else {
          retorno = 'Error inesperado con el tipo de mesa';
        }
        break;
    }

    return retorno;
  }
}
