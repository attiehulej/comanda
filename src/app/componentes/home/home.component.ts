import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { NotificationService } from 'src/app/servicios/notification.service';
  import { from } from 'rxjs';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { Notificacion } from 'src/app/clases/notificacion';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  public formHome: FormGroup;
  usuario: Usuario = null;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    private utilsService: UtilsService,
    public usuarioService: UsuarioService,
    public notificationService: NotificationService,
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.notificationService.activarNotificaiones(this.usuario.perfil);
        /*
        let notificacion = new Notificacion();
        notificacion.idPedido = "27";
        notificacion.mensaje = "sale con fritas";
        notificacion.receptor = TipoUsuario.COCINERO;
        this.notificationService.crearNotificacion(notificacion);//.then(data => console.log(data));
        */
      })
      //.subscribe(datos => {console.log(datos[0].mensaje)});
    });
  }

  ionViewWillEnter() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
      });
    });
  }

  gestionarUsuarios() {
    this.utilsService.showLoadingAndNavigate('usuarios');
  }

  gestionarMesas() {
    this.utilsService.showLoadingAndNavigate('mesas');
  }

  gestionarListaEspera() {
    this.utilsService.showLoadingAndNavigate('clientes-espera');
  }
  gestionarPropinas() {
    this.utilsService.showLoadingAndNavigate('propinas');
  }

  /*logOut(): void {
    this.authService.logout();
    this.utilsService.showLoadingAndNavigate('inicio');
  }*/

  irAProductos(): void {
    this.utilsService.showLoadingAndNavigate('productos');
  }

  irACocinero():void{
    this.utilsService.showLoadingAndNavigate('cocinero');
  }

  irABartender():void{
    this.utilsService.showLoadingAndNavigate('bartender');
  }
}
