import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from '../../servicios/spinner-router.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
})
export class InicioComponent implements OnInit {

  constructor(
    private spinnerRouter: SpinnerRouterService
  ) { }

  ngOnInit() {}

  manejadoraInicio(opcion: string): void
  {
    switch(opcion)
    {
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
