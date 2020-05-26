import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import * as $ from 'jquery';
import { IfStmt } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit 
{
  correo : string;
  clave : string;
  usuarios: Observable<any[]>; //variable aux
  listaSupDue: any[];  //lista dueños y supervisores

  constructor(public router : Router, public db : AngularFirestore) 
  { 
    this.usuarios = db.collection('supDue').valueChanges(); //supDue - coleccion dueños y supervisores
    this.usuarios.subscribe(usuarios => this.listaSupDue = usuarios, error => console.log(error));
  }

  ngOnInit() {}

  onSubmitLogin()
  {
    let usuarioEncontrado : boolean = false;
    this.correo=$("#inpCorreoLogin").val();
    this.clave=$("#inpClaveLogin").val();
    if(this.datosValidos(this.correo, this.clave))
    {
      for (let usuario of this.listaSupDue)
      {
        if(usuario.correo == this.correo && usuario.clave == this.clave)
        {
          usuarioEncontrado = true;
          localStorage.setItem("usuario", usuario.perfil);
          this.moveToHome();
          break;
        }
      }
      if(usuarioEncontrado == false)
      {
        $("#errUsuarioLogin").attr("hidden", false);
      }
    }
  }

  moveToHome() : void
  {
    this.limpiarErrores();
    this.limpiarInputs();
    $("#loadingContainerLogin").attr("hidden", false);
    setTimeout(() => {
      $("#loadingContainerLogin").attr("hidden", true);
      this.router.navigate(['/home']);
    }, 2000);
  }

  datosValidos(correo : string, clave : string) : boolean
  {
    let contador : number = 0;
    if(this.correoValido(correo))
    {
      $("#errCorreoLogin").attr("hidden", true);
      contador++;
    }
    else
    {
      $("#errCorreoLogin").attr("hidden", false);
    }
    if(this.claveValida(clave))
    {
      $("#errClaveLogin").attr("hidden", true);
      contador++;
    }
    else
    {
      $("#errClaveLogin").attr("hidden", false);
    }
    if(contador == 2)
    {
      return true;
    }
    else
    {
      return false;
    }
  }

  correoValido(correo : string) : boolean
  {
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    let retorno = regexp.test(correo);
    return retorno;
  }

  claveValida(clave : string) : boolean
  {
    let retorno = true;
    if(clave != "")
    {
      if(clave.length == 4)
      {
        for(let caracter of clave)
        {
          if(caracter < '0' || caracter > '9')
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

  limpiarErrores() : void
  {
    $("#errCorreoLogin").attr("hidden", true);
    $("#errClaveLogin").attr("hidden", true);
    $("#errUsuarioLogin").attr("hidden", true);
  }

  limpiarInputs() : void
  {
    $("#inpCorreoLogin").val("");
    $("#inpClaveLogin").val("");
    //LIMPIAMOS LOS VALORES PORQUE A VECES QUEDAN CARGADOS
    this.correo = "";
    this.clave = "";
  }
}
