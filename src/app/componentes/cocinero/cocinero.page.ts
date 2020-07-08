import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from 'src/app/clases/usuario';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-cocinero',
  templateUrl: './cocinero.page.html',
  styleUrls: ['./cocinero.page.scss'],
})
export class CocineroPage implements OnInit {

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

  cambiarVistaCocinero(): boolean
  {
    return this.pedidosPendientes;
  }
}
