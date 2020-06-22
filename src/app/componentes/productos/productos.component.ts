import { Component, OnInit, OnDestroy } from '@angular/core';
import { Sectores } from '../../enums/sectores.enum';
import { Producto } from '../../clases/producto';
import { ProductoService } from '../../servicios/producto.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { SpinnerRouterService } from '../../servicios/spinner-router.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit, OnDestroy {
  // https://stackoverflow.com/questions/56036446/typescript-enum-values-as-array
  // https://stackoverflow.com/questions/35546421/how-to-get-a-variable-type-in-typescript
  public sectores = Object.values(Sectores).filter(unTipo => typeof unTipo === 'string');
  public sector = '';
  private listaProductos: Producto[];
  public producto: Producto;
  private desuscribir = new Subject<void>();
  private spinner = 'loadingContainerProducto';

  constructor(
    private productos: ProductoService,
    public spinnerRouter: SpinnerRouterService
  ) { }

  ngOnInit() {
    this.productos.obtenerProductos()
    .pipe(takeUntil(this.desuscribir))
    .subscribe(call => this.listaProductos = call);
  }

  ngOnDestroy() {
    this.desuscribir.next();
    this.desuscribir.complete();
  }

  public getProductos(): Producto[] {
    let retorno = [];
    if (this.listaProductos) {
      retorno = this.listaProductos.filter(call2 => call2.sector === this.sector);
    }
    return retorno;
  }

  public volverHome(): void {
    this.spinnerRouter.showSpinnerAndNavigate('home', this.spinner, 2000);
  }
}
