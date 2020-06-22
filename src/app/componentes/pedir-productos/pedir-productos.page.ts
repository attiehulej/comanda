import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { Producto } from 'src/app/clases/producto';
import { Sectores } from 'src/app/enums/sectores.enum';

@Component({
  selector: 'app-pedir-productos',
  templateUrl: './pedir-productos.page.html',
  styleUrls: ['./pedir-productos.page.scss'],
})
export class PedirProductosPage implements OnInit {

  public formPedirProductos: FormGroup;
  perfilUsuarioPedirProductos;
  imgUsuarioPedirProductos;

  mostrarPlatos: boolean = true;
  mostrarPostres: boolean = false;
  mostrarBebidas: boolean = false;

  productos: Observable<any[]>;
  lista: any[];
  listaPlatos: any[] = [];
  listaPostres: any[] = [];
  listaBebidas: any[] = [];

  listaPedido: any[] = [];
  totalPedido: number = 0;
  mostrarConfirmarPedido: boolean = false;

  constructor(
    public spinnerRouter: SpinnerRouterService,
    public servicioAlta : AuthService,
    private fb: FormBuilder,
    public db : AngularFirestore
  ) 
  {
    this.productos = this.db.collection('productos').valueChanges();
    this.productos.subscribe(productos => {
      this.lista = productos;
      for (const producto of this.lista) 
      {
        switch(producto.sector)
        {
          case 'COMIDAS':
            this.listaPlatos.push(producto);
            break;
          case 'POSTRES':
            this.listaPostres.push(producto);
            break;
          case 'BEBIDAS':
            this.listaBebidas.push(producto);
            break;
        }
      }
    }, error => console.log(error));
  }


  cambiarVistaPedirProductos(): boolean
  {
    return this.mostrarConfirmarPedido;
  }

  mostrarSegunTipoProducto(producto): boolean
  {
    let retorno: boolean = false;
    switch(producto) //prodducto.sector va
    {
      case 'COMIDAS':
        if(this.mostrarPlatos)
        {
          retorno = true;
        }
        break;

      case 'BEBIDAS':
        if(this.mostrarBebidas)
        {
          retorno = true;
        }
        break;

      case 'POSTRES':
        if(this.mostrarPostres)
        {
          retorno = true;
        }
        break;
    }
    return retorno;
  }

  ponerFormatoFoto(cadena: string): string
  {
    let retorno: string = cadena;
    retorno = 'data:image/jpeg;base64,' + cadena;
    return retorno;
  }

  ngOnInit() 
  {
    this.formPedirProductos = this.fb.group
    ({
      totalPedido: ['$0'],
    });


    this.servicioAlta.currentUser().then((response : firebase.User) => {
      let aux = this.servicioAlta.obtenerDetalle(response); 
      aux.subscribe(datos => {
        this.perfilUsuarioPedirProductos = datos.perfil;
        if(this.perfilUsuarioPedirProductos == "CLIENTE_REGISTRADO")
        {
          this.perfilUsuarioPedirProductos = "CLIENTE";
        }
        
        if(datos.foto != '')
        {
          this.imgUsuarioPedirProductos = 'data:image/jpeg;base64,' + datos.foto;
        }
        else
        {
          this.imgUsuarioPedirProductos = '../../../assets/defaultFoto.png';
        }
      });
    }).catch((reject : any) => {
      console.log(reject);
    });
  }

  onSubmitPedirProductos(): void
  {

  }

  tipoDePedidoSeleccionado(tipoDeProducto: string): void   //SEGUN QUE RECIBE LO RESALTA
  {
    switch(tipoDeProducto)
    {
      case 'platos':
        this.mostrarPlatos = true;
        this.mostrarPostres = false;
        this.mostrarBebidas = false;
        break;
      case 'postres':
        this.mostrarPlatos = false;
        this.mostrarPostres = true;
        this.mostrarBebidas = false;
        break;
      case 'bebidas':
        this.mostrarPlatos = false;
        this.mostrarPostres = false;
        this.mostrarBebidas = true;
        break;
    }
  }

  agregarProducto(producto): void
  {
    for (const productoLista of this.lista) 
    {
      if(productoLista.codigo == producto.codigo)
      {
        productoLista.cantidad++;
        break;
      }  
    }
    this.mostrarTotal();
  }

  eliminarProducto(producto): void
  {
    for (const productoLista of this.lista) 
    {
      if(productoLista.codigo == producto.codigo)
      {
        if(productoLista.cantidad > 0)
        {
          productoLista.cantidad--;
        }
        break;
      }  
    }
    this.mostrarTotal();
  }

  mostrarTotal(): void
  {
    let contador = 0;
    for (const producto of this.lista) 
    {
      contador = contador + (producto.precio * producto.cantidad);
    }
    this.totalPedido = contador;
    this.formPedirProductos.controls.totalPedido.setValue('$'+contador);
  }

  confirmarPedido(): void
  {
    this.mostrarConfirmarPedido = true;
  }

  volverPedirProductos(): void
  {
    this.spinnerRouter.showSpinnerAndNavigate('home', 'loadingContainerPedirProductos', 2000);
  }

  cancelar(): void
  {
    this.mostrarConfirmarPedido = false;
  }

  ordenar(): void //ENVIAR NOTIFICACION A EMPLEADOS CORRESPONDIENTES
  {

  }
}
