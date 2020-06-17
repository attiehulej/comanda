import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-clientes-pendientes',
  templateUrl: './clientes-pendientes.page.html',
  styleUrls: ['./clientes-pendientes.page.scss'],
})
export class ClientesPendientesPage implements OnInit {
  
  perfilUsuarioClientesPendientes;
  imgUsuarioClientesPendientes;
  constructor(
    public spinnerRouter: SpinnerRouterService,
    public servicioAlta : AuthService
  ) { }

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

  volverClientesPendientes(): void
  {
    this.spinnerRouter.showSpinnerAndNavigate('home', 'loadingContainerClientesPendientes', 2000);
  }
}
