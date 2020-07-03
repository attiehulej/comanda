import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { UtilsService } from 'src/app/servicios/utils.service';
import { Usuario } from 'src/app/clases/usuario';
import { UsuarioService } from 'src/app/servicios/usuario.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  usuario: Usuario = null;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService,
    private usuarioService: UsuarioService) { }

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

  logOut(): void {
    this.authService.logout();
    this.utilsService.showLoadingAndNavigate('inicio');
  }

  irListaEspera(): void {
    this.utilsService.showLoadingAndNavigate('clientes/lista-espera');
  }

}
