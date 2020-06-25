import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/servicios/auth.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.page.html',
  styleUrls: ['./clientes.page.scss'],
})
export class ClientesPage implements OnInit {
  public perfilUsuarioHome: string;
  public imgUsuarioHome: string;

  constructor(
    private authService: AuthService,
    private utilsService: UtilsService) { }

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

  logOut(): void {
    this.authService.logout();
    this.utilsService.showLoadingAndNavigate('inicio');
  }

}
