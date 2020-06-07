import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { AngularFirestore } from 'angularfire2/firestore'; // PATO
import { AngularFirestore } from '@angular/fire/firestore'; // PATO
import * as $ from 'jquery';
import { VibrationService } from 'src/app/servicios/vibration.service';
// import { IfStmt } from '@angular/compiler';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { SpinnerService } from 'src/app/servicios/spinner.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit
{
  correo: string;
  clave: string;
  usuarios: Observable<any[]>;
  listaUsuarios: any[];

  esDuenio: boolean = false;

  constructor(public router: Router, public db: AngularFirestore, public vibration : VibrationService, public spinnerRouter : SpinnerRouterService, public spinner : SpinnerService)
  {
    this.usuarios = db.collection('usuarios').valueChanges(); 
    this.usuarios.subscribe(usuarios => this.listaUsuarios = usuarios, error => console.log(error));
  }

  ngOnInit() {}

  onSubmitLogin(): void
  {
    let usuarioEncontrado = false;
    this.correo = $('#inpCorreoLogin').val();
    this.clave = $('#inpClaveLogin').val();

    if (this.datosValidos(this.correo, this.clave))
    {
      for(let usuario of this.listaUsuarios)
      {
        if (usuario.correo == this.correo && usuario.clave == this.clave)
        {
          //localStorage.setItem('tipoDeAlta', usuario.tipo);
          localStorage.setItem('tipoDeAlta', 'anonimo');
          usuarioEncontrado = true;
          break;
        }
      }
      
      if(usuarioEncontrado)
      {
        this.moveToHome();
      }
      else
      {
        this.vibration.vibrar(500);
        $('#errUsuarioLogin').attr('hidden', false);
      }
    }
  }

  moveToHome(): void
  {
    this.limpiarErrores();
    this.limpiarInputs();
    this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerLogin', 2000);
  }

  datosValidos(correo: string, clave: string): boolean
  {
    let contador = 0;
    if (this.correoValido(correo))
    {
      $('#errCorreoLogin').attr('hidden', true);
      contador++;
    }
    else
    {
      $('#errCorreoLogin').attr('hidden', false);
    }
    if (this.claveValida(clave))
    {
      $('#errClaveLogin').attr('hidden', true);
      contador++;
    }
    else
    {
      $('#errClaveLogin').attr('hidden', false);
    }
    if (contador == 2)
    {
      return true;
    }
    else
    {
      this.vibration.vibrar(500);
      return false;
    }
  }

  correoValido(correo: string): boolean
  {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const retorno = regexp.test(correo);
    return retorno;
  }

  claveValida(clave: string): boolean
  {
    let retorno = true;
    if (clave !== '')
    {
      if (clave.length >= 4 && clave.length <= 6)
      {
        for (let caracter of clave)
        {
          if (caracter < '0' || caracter > '9')
          {
            retorno = false;
            break;
          }
        }
      }
      else
      {
        retorno = false;
      }
    }
    else
    {
      retorno = false;
    }
    return retorno;
  }

  limpiarErrores(): void
  {
    $('#errCorreoLogin').attr('hidden', true);
    $('#errClaveLogin').attr('hidden', true);
    $('#errUsuarioLogin').attr('hidden', true);
  }

  limpiarInputs(): void
  {
    $('#inpCorreoLogin').val('');
    $('#inpClaveLogin').val('');
    // LIMPIAMOS LOS VALORES PORQUE A VECES QUEDAN CARGADOS
    this.correo = '';
    this.clave = '';
  }
}
