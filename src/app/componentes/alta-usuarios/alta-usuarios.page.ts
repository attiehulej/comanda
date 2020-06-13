import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';
import { CameraService } from 'src/app/servicios/camera.service';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFirestore } from '@angular/fire/firestore'; 
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { ToastService } from '../../servicios/toast.service';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.page.html',
  styleUrls: ['./alta-usuarios.page.scss'],
})

export class AltaUsuariosPage implements OnInit {
  
  public formUsuario: FormGroup;
  
  usuarios: Observable<any[]>;
  listaUsuarios: any[];
  captureDataUrl = new Array<string>();
  datosEscaneados: any;
  qrScan: any;

  constructor(
    public spinnerRouter : SpinnerRouterService, 
    private fb: FormBuilder,
    private camera : CameraService,
    public db : AngularFirestore,
    public scanner : BarcodeScanner,
    public toast : ToastService
  ) 
  {
    this.usuarios = db.collection('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => this.listaUsuarios = usuarios, error => console.log(error));
  }

  ngOnInit() 
  {
    this.formUsuario = this.fb.group
    ({
      correo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      clave: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[a-zA-Z ]*')]],
      apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[a-zA-Z ]*')]],
      dni: ['', [Validators.required, Validators.min(0), Validators.minLength(7), Validators.maxLength(8), Validators.pattern('[0-9]*')]],
      cuil: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11), Validators.pattern('[0-9]*')]],
      tipo: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      limpiar: ['']
    });
  }


  onSubmitUsuario(): void
  {
    if(this.errorFomularioAltaUsarios() == false) //SI EL FORM NO TIENE ERRORES
    {
      //SE LLAMA AL SERVICIO DE ALTA
    }
    else
    {
      this.toast.presentToast("Datos Invalidos");
      this.markAllAsDirtyAltaUsuarios(this.formUsuario);
    }
  }

  private markAllAsDirtyAltaUsuarios(formGroup: FormGroup): void
  {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsDirty();
    });
  }

  errorFomularioAltaUsarios(): boolean
  {
    let retorno: boolean = true;

    switch(localStorage.getItem('tipoDeAlta'))
    {
      case 'dueño':
        if(this.formUsuario.controls.correo.valid && this.formUsuario.controls.clave.valid && this.formUsuario.controls.nombre.valid && 
          this.formUsuario.controls.apellido.valid && this.formUsuario.controls.dni.valid && this.formUsuario.controls.cuil.valid)
        {
          retorno = false;
        }
        break;

      case 'supervisor':
        if(this.formUsuario.controls.correo.valid && this.formUsuario.controls.clave.valid && this.formUsuario.controls.nombre.valid && 
          this.formUsuario.controls.apellido.valid && this.formUsuario.controls.dni.valid && this.formUsuario.controls.cuil.valid)
          {
            retorno = false;
          }
        break;

      case 'empleado':
        if(this.formUsuario.controls.correo.valid && this.formUsuario.controls.clave.valid && this.formUsuario.controls.nombre.valid && 
          this.formUsuario.controls.apellido.valid && this.formUsuario.controls.dni.valid && this.formUsuario.controls.cuil.valid && this.formUsuario.controls.tipo)
        {
          retorno = false;
        }
        break;

      case 'cliente':
        if(this.formUsuario.controls.correo.valid && this.formUsuario.controls.clave.valid && this.formUsuario.controls.nombre.valid && 
          this.formUsuario.controls.apellido.valid && this.formUsuario.controls.dni.valid)
        {
          retorno = false;
        }
        break;

      case 'anonimo':
        if(this.formUsuario.controls.correo.valid && this.formUsuario.controls.clave.valid && this.formUsuario.controls.nombre.valid)
        {
          retorno = false;
        }
        break;
    }

    return retorno;
  }
  
  mostrarSegunAlta(elemento : string): boolean
  {
    let retorno: boolean = false;
    switch(localStorage.getItem('tipoDeAlta'))
    {
      case 'dueño':
        if(elemento == 'correo' || elemento == 'clave' || elemento == 'nombre' || elemento == 'apellido' || elemento == 'dni' || elemento == 'cuil')
        {
          retorno = true;
        }
        break;

      case 'supervisor':
        if(elemento == 'correo' || elemento == 'clave' || elemento == 'nombre' || elemento == 'apellido' || elemento == 'dni' || elemento == 'cuil')
        {
          retorno = true;
        }
        break;

      case 'empleado':
        if(elemento == 'correo' || elemento == 'clave' || elemento == 'nombre' || elemento == 'apellido' || elemento == 'dni' || elemento == 'cuil' || elemento == 'tipo')
        {
          retorno = true;
        }
        break;

      case 'cliente':
        if(elemento == 'correo' || elemento == 'clave' || elemento == 'nombre' || elemento == 'apellido' || elemento == 'dni')
        {
          retorno = true;
        }
        break;

      case 'anonimo':
        if(elemento == 'correo' || elemento == 'clave' || elemento == 'nombre')
        {
          retorno = true;
        }
        break;
    }
    return retorno;
  }

  scanQrAltaUsuarios(): void
  {
    this.scanner.scan({ "formats": "PDF_417" }).then((data) => {
      this.datosEscaneados = data;
      this.cargarDatosQr(this.datosEscaneados);
    }, (err) => {
      console.log("Error: " + err);
    });
  }

  cargarDatosQr(datos : any): void
  {
    let parsedData = datos.text.split('@');
    let nombre = parsedData[2].toString();
    let apellido = parsedData[1].toString();
    let dni: number = parsedData[4];
    this.formUsuario.get('nombre').setValue(nombre);
    this.formUsuario.get('apellido').setValue(apellido);
    this.formUsuario.get('dni').setValue(dni);
  }

  tomarFotoAltaUsuarios(): void
  {
    this.camera.tomarFoto().then(data => {
      this.db.collection('usuarios').add({
        foto: data, 
      })
    });
  }
  
  volverAltaUsuarios(): void
  {
    this.formUsuario.reset();
    this.spinnerRouter.showSpinnerAndNavigate('login', 'loadingContainerAltaUsuarios', 2000);
  }

  validacionAuxCuil(dni : string): boolean
  {
    let retorno : boolean = false;
    console.log(dni);
    if(this.formUsuario.controls.cuil.pristine)
    {
      retorno = true;
    }
    else
    {
      let cuil : string = this.formUsuario.controls.cuil.value;
      if(cuil.includes(dni))
      {
        retorno = true;
      }
    }
    return retorno;
  }
}
