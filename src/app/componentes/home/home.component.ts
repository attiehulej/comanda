import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl, Form } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { element } from 'protractor';

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
    public servicioAlta: AuthService
  ) { }

  ngOnInit() {
    this.servicioAlta.currentUser().then((response: firebase.User) => {
      const aux = this.servicioAlta.obtenerDetalle(response);
      aux.subscribe(datos => {
        this.perfilUsuarioHome = datos.perfil;
        if (this.perfilUsuarioHome === 'CLIENTE_REGISTRADO') {
          this.perfilUsuarioHome = 'CLIENTE';
        }

        if (datos.foto !== '') {
          this.imgUsuarioHome = 'data:image/jpeg;base64,' + datos.foto;
        }
        else {
          this.imgUsuarioHome = '../../../assets/defaultFoto.png';
        }
      });
    }).catch((reject: any) => {
      console.log(reject);
    });
  }

  // COMPLETAR LUCAS
  mostrarSegunPerfil(elemento: string): boolean {
    let retorno = false;
    switch (this.perfilUsuarioHome) {
      case 'DUEÑO':
        if (elemento === 'clientesPendientes' ||
          elemento === 'altaDueño' ||
          elemento === 'altaSupervisor' ||
          elemento === 'altaEmpleado' ||
          elemento === 'altaClienteRegistrado' ||
          elemento === 'altaClienteAnonimo' ||
          elemento === 'pedirProductos') {
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

  manejadoraHome(opcion: string): void {
    switch (opcion) {
      case 'DUEÑO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerHome', 2000);
        break;

      case 'SUPERVISOR':
        localStorage.setItem('tipoDeAlta', opcion);
        this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerHome', 2000);
        break;

      case 'EMPLEADO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerHome', 2000);
        break;

      case 'CLIENTE_ANONIMO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerHome', 2000);
        break;

      case 'CLIENTE_REGISTRADO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerHome', 2000);
        break;

      case 'PENDIENTE':
        this.spinnerRouter.showSpinnerAndNavigate('clientes-pendientes', 'loadingContainerHome', 2000);
        break;

      case 'PEDIR_PRODUCTOS':
        this.spinnerRouter.showSpinnerAndNavigate('pedir-productos', 'loadingContainerHome', 2000);
        break;
    }
  }

  logOut(): void {
    this.servicioAlta.logout();
    this.spinnerRouter.showSpinnerAndNavigate('inicio', 'loadingContainerHome', 2000);
  }

  public abmUsuario(tipoDeAlta: string): void {
    localStorage.setItem('tipoDeAlta', tipoDeAlta);
    this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerHome', 2000);
  }

  public productos(): void {
    this.spinnerRouter.showSpinnerAndNavigate('productos', 'loadingContainerHome', 2000);
  }
}
