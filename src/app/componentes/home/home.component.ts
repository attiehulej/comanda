import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../../servicios/auth.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

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
    public usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      const aux = this.authService.obtenerDetalle(response);
      aux.subscribe(datos => {
        this.usuario = datos;
      });
    }).catch((reject: any) => {
      console.log(reject);
    });
  }

  gestionarUsuarios() {
    this.utilsService.showLoadingAndNavigate('usuarios');
  }

  gestionarMesas() {
    this.utilsService.showLoadingAndNavigate('mesas');
  }

  gestionarPropinas() {
    this.utilsService.showLoadingAndNavigate('propinas');
  }

  /*logOut(): void {
    this.authService.logout();
    this.utilsService.showLoadingAndNavigate('inicio');
  }*/

  public productos(): void {
    this.utilsService.showLoadingAndNavigate('productos');
  }
}
