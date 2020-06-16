import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl, Form } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public formHome: FormGroup;
  perfilUsuarioHome;
  imgUsuarioHome;
  constructor(
    public spinnerRouter: SpinnerRouterService,
    public fb: FormBuilder,
    public servicioAlta : AuthService
  ) 
  {}

  ngOnInit()
  {
    this.servicioAlta.currentUser().then((response : firebase.User) => {
      let aux = this.servicioAlta.obtenerDetalle(response); 
      aux.subscribe(datos => {
        this.perfilUsuarioHome = datos.perfil;
        if(datos.foto != '')
        {
          this.imgUsuarioHome = 'data:image/jpeg;base64,' + datos.foto;
        }
        else
        {
          this.imgUsuarioHome = '../../../assets/defaultFoto.png';
        }
      });
    }).catch((reject : any) => {
      console.log(reject);
    });
  }

  //COMPLETAR LUCAS
  mostrarSegunPerfil(elemento : string): boolean
  {
    let retorno: boolean = false;
    switch(this.perfilUsuarioHome)
    {
      case 'DUEÑO':
        if(elemento == 'altaDueño' || elemento == 'altaSupervisor' || elemento == 'altaEmpleado' || elemento == 'altaClienteRegistrado' || elemento == 'altaClienteAnonimo')
        {
          retorno = true;
        }
        break;

      case 'SUPERVISOR':
        break;
      case 'MOZO':
        break;
      case 'METRE':
        break;
      case 'COCINERO':
        break;
      case 'BARTENDER':
        break;
      case 'CLIENTE_REGISTRADO':
        break;
      case 'CLIENTE_ANONIMO':
        break;
    }
    return retorno;
  }

  volverHome(): void
  {
    this.servicioAlta.logout();
    this.spinnerRouter.showSpinnerAndNavigate('login', 'loadingContainerHome', 2000);
  }

  public abmMesa(): void 
  {
    this.spinnerRouter.showSpinnerAndNavigate('cargaMesa', 'loadingContainerHome', 2000);
  }

  public abmProducto(): void 
  {
    this.spinnerRouter.showSpinnerAndNavigate('cargaProducto', 'loadingContainerHome', 2000);
  }

  public abmUsuario(tipoDeAlta: string): void 
  {
    localStorage.setItem('tipoDeAlta', tipoDeAlta);
    this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerHome', 2000);
  }
}
