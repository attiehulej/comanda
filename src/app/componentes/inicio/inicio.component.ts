import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from '../../servicios/spinner-router.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { EstadoUsuario } from 'src/app/enums/estado-usuario.enum';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  constructor(
    private spinnerRouter: SpinnerRouterService,
    private router: Router,
    private authService: AuthService,
  ) {
  }

  ngOnInit() {
    this.authService.isLoggedIn().then(auth => {
      console.log(auth);
      if (auth) {
        // Si esta logeuado lo redireccionamos
        this.authService.obtenerDetalle(auth).subscribe(usuario => {
          console.log(usuario);
          if (usuario.estado === EstadoUsuario.APROBADO) {
            if (usuario.perfil === TipoUsuario.CLIENTE_REGISTRADO || usuario.perfil === TipoUsuario.CLIENTE_ANONIMO) { // Clientes
              this.router.navigate(['/clientes']);
            } else { // Personal
              this.router.navigate(['/home']);
            }
          }
        });
      }
    });
  }

  manejadoraInicio(opcion: string): void {
    switch (opcion) {
      case 'CLIENTE_ANONIMO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerInicio', 2000);
        break;

      case 'CLIENTE_REGISTRADO':
        localStorage.setItem('tipoDeAlta', opcion);
        this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerInicio', 2000);
        break;

      case 'LOGIN':
        this.spinnerRouter.showSpinnerAndNavigate('login', 'loadingContainerInicio', 2000);
        break;
    }
  }
}
