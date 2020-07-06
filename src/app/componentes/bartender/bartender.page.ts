import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from 'src/app/clases/usuario';

@Component({
  selector: 'app-bartender',
  templateUrl: './bartender.page.html',
  styleUrls: ['./bartender.page.scss'],
})
export class BartenderPage implements OnInit {

  usuario: Usuario = null;
  pedidosPendientes: boolean = false;

  constructor(public authService: AuthService) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
      });
    });
  }

  cambiarVistaBartender(): boolean
  {
    return this.pedidosPendientes;
  }
}
