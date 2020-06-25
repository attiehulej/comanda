import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { UtilsService } from 'src/app/servicios/utils.service';

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
    public fb: FormBuilder,
    public authService: AuthService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      const aux = this.authService.obtenerDetalle(response);
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
        this.utilsService.showLoadingAndNavigate('alta-usuarios');
        break;

      case 'SUPERVISOR':
        localStorage.setItem('tipoDeAlta', opcion);
        this.utilsService.showLoadingAndNavigate('alta-usuarios');
        break;

      case 'EMPLEADO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.utilsService.showLoadingAndNavigate('alta-usuarios');
        break;

      case 'CLIENTE_ANONIMO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.utilsService.showLoadingAndNavigate('alta-usuarios');
        break;

      case 'CLIENTE_REGISTRADO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.utilsService.showLoadingAndNavigate('alta-usuarios');
        break;

      case 'PENDIENTE':
        this.utilsService.showLoadingAndNavigate('clientes-pendientes');
        break;

      case 'PEDIR_PRODUCTOS':
        this.utilsService.showLoadingAndNavigate('pedir-productos');
        break;
    }
  }

  logOut(): void {
    this.authService.logout();
    this.utilsService.showLoadingAndNavigate('inicio');
  }

  public abmUsuario(tipoDeAlta: string): void {
    localStorage.setItem('tipoDeAlta', tipoDeAlta);
    this.utilsService.showLoadingAndNavigate('alta-usuarios');
  }

  public productos(): void {
    this.utilsService.showLoadingAndNavigate('productos');
  }
}
