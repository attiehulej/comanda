import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { AngularFirestore } from 'angularfire2/firestore'; // PATO
import { AngularFirestore } from '@angular/fire/firestore'; // PATO
import * as $ from 'jquery';
import { VibrationService } from 'src/app/servicios/vibration.service';
// import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit
{
  correo: string;
  clave: string;
  usuarios: Observable<any[]>; // variable aux
  usuarios2: Observable<any[]>; // variable aux
  listaSupDue: any[];  // lista dueños y supervisores
  listaEmpleados: any[]; //lista empleados

  esSupDue: boolean = false;
  esEmpleado: boolean = false;

  constructor(public router: Router, public db: AngularFirestore)
  {
    //LISTA SUPERVISORES Y DUEÑOS
    this.usuarios = db.collection('supDue').valueChanges(); 
    this.usuarios.subscribe(usuarios => this.listaSupDue = usuarios, error => console.log(error));

    //LISTA EMPLEADOS
    this.usuarios = db.collection('empleados').valueChanges(); 
    this.usuarios.subscribe(usuarios => this.listaEmpleados = usuarios, error => console.log(error));
  }

  ngOnInit() {}

  onSubmitLogin(): void
  {
    let usuarioEncontrado = false;
    let path : string = "";
    this.correo = $('#inpCorreoLogin').val();
    this.clave = $('#inpClaveLogin').val();

    if (this.datosValidos(this.correo, this.clave))
    {
      for(let usuario of this.listaSupDue)
      {
        if (usuario.correo == this.correo && usuario.clave == this.clave)
        {
          usuarioEncontrado = true;
          path = "supervisoresDueños";
          break;
        }
      }

      if(usuarioEncontrado == false)
      {
        for(let usuario of this.listaEmpleados)
        {
          if (usuario.correo === this.correo && usuario.clave === this.clave)
          {
            usuarioEncontrado = true;
            path = "empleados";
            break;
          }
        }
      }
      
      
      if(usuarioEncontrado)
      {
        this.moveToHome(path);
      }
      else
      {
        $('#errUsuarioLogin').attr('hidden', false);
      }
    }
  }

  moveToHome(caso : string): void
  {
    this.limpiarErrores();
    this.limpiarInputs();
    $('#loadingContainerLogin').attr('hidden', false);
    setTimeout(() => {
      $('#loadingContainerLogin').attr('hidden', true);
      switch(caso)
      {
        case 'supervisoresDueños':
          this.router.navigate(['/sup-due']); //pagina dueños y supervisores
          break;
        case 'empleados':
          this.router.navigate(['/empleados']);
          break;
      }
    }, 2000);
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
      if (clave.length == 4)
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
