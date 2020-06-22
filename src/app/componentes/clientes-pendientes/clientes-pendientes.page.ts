import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { AuthService } from '../../servicios/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstadoUsuario } from 'src/app/enums/estado-usuario.enum';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-clientes-pendientes',
  templateUrl: './clientes-pendientes.page.html',
  styleUrls: ['./clientes-pendientes.page.scss'],
})

export class ClientesPendientesPage implements OnInit 
{
 
  usuarios: Observable<any[]>;
  lista: any[];
  perfilUsuarioClientesPendientes;
  imgUsuarioClientesPendientes;
  usuariosPendientes: any[] = [];

  constructor(
    public spinnerRouter: SpinnerRouterService,
    public servicioAlta : AuthService, 
    private fb: FormBuilder,
    db : AngularFirestore,
  ) 
  {
    this.usuarios = db.collection('usuarios').valueChanges();
    this.usuarios.subscribe(usuarios => {
      this.lista = usuarios;
      for (const usuario of this.lista) 
      {
        if(usuario.estado == EstadoUsuario.PENDIENTE && usuario.perfil == TipoUsuario.CLIENTE_REGISTRADO)
        {
          this.usuariosPendientes.push(usuario);
        }
      }
    }, error => console.log(error));
  }

  ngOnInit() 
  {
    this.servicioAlta.currentUser().then((response : firebase.User) => {
      let aux = this.servicioAlta.obtenerDetalle(response); 
      aux.subscribe(datos => {
        this.perfilUsuarioClientesPendientes = datos.perfil;
        if(datos.foto != '')
        {
          this.imgUsuarioClientesPendientes = 'data:image/jpeg;base64,' + datos.foto;
        }
        else
        {
          this.imgUsuarioClientesPendientes = '../../../assets/defaultFoto.png';
        }
      });
    }).catch((reject : any) => {
      console.log(reject);
    });
  }

  usuarioEstaPendiente(usuario): boolean
  {
    let retorno: boolean = false;
    if(usuario.estado == EstadoUsuario.PENDIENTE)
    {
      retorno = true;
    }
    return retorno;
  }

  aprobarUsuario(usuario): void
  {
    this.servicioAlta.gestionarUsuario(usuario, EstadoUsuario.APROBADO).then(datos=>(console.log(datos))).catch(err => console.log(err));
    this.usuariosPendientes = [];
  }

  declinarUsuario(usuario): void
  {
    this.servicioAlta.gestionarUsuario(usuario, EstadoUsuario.RECHAZADO).then(datos=>(console.log(datos))).catch(err => console.log(err));
    this.usuariosPendientes = [];
  }

  volverClientesPendientes(): void
  {
    this.spinnerRouter.showSpinnerAndNavigate('home', 'loadingContainerClientesPendientes', 2000);
  }
}
