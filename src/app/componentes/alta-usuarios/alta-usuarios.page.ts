import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { CameraService } from 'src/app/servicios/camera.service';
import { Observable } from 'rxjs/internal/Observable'; //eliminar lucas
import { AngularFirestore } from '@angular/fire/firestore'; //eliminar lucas
import * as $ from 'jquery';

@Component({
  selector: 'app-alta-usuarios',
  templateUrl: './alta-usuarios.page.html',
  styleUrls: ['./alta-usuarios.page.scss'],
})

export class AltaUsuariosPage implements OnInit {
  
  public formUsuario: FormGroup;
  
  usuarios: Observable<any[]>;
  listaUsuarios: any[];

  constructor(
    public spinnerRouter : SpinnerRouterService, 
    private fb: FormBuilder,
    private camera : CameraService,
    public db : AngularFirestore
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
      nombre: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[a-zA-Z]*')]],
      apellido: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(12), Validators.pattern('[a-zA-Z]*')]],
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
      alert("NO SE PUEDE ENVIAR UN SERVICIO CON ERRRORES");
    }
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

  tomarFotoAltaUsuarios(): void
  {
    let foto: string = "";
    foto = this.camera.tomarFoto();
    this.db.collection('usuarios').add({
        foto: foto, 
    })
  }
  
  volverAltaUsuarios(): void
  {
    this.formUsuario.reset();
    this.spinnerRouter.showSpinnerAndNavigate('login', 'loadingContainerAltaUsuarios', 2000);
  }
}
