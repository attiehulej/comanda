import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
// import { AngularFirestore } from 'angularfire2/firestore'; // PATO
import { AngularFirestore } from '@angular/fire/firestore'; // PATO
import * as $ from 'jquery';
import { VibrationService } from 'src/app/servicios/vibration.service';
// import { IfStmt } from '@angular/compiler';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {
  correo: string;
  clave: string;
  usuarios: Observable<any[]>;
  listaUsuarios: any[];
  esDuenio = false;

  constructor(
    public router: Router,
    public db: AngularFirestore,
    public vibration: VibrationService,
    public spinnerRouter: SpinnerRouterService,
    public usuarioService: UsuarioService) {
  }

  ngOnInit() {
    // Obtener Usuarios
    this.usuarioService.obtenerUsuarios().subscribe(usuarios => {
      this.listaUsuarios = usuarios;
      console.log(usuarios);
    }, error => console.log(error));

    // Obtener 1 usuario por id
    this.usuarioService.obtenerUsuario('TmDELo4y9v8BaXm4cz4G').subscribe(usr => {
      console.log(usr);
    }, error => console.log(error));

    // Crear usuario
    /*
    const usuarioNuevo = new Usuario();

    usuarioNuevo.nombre = 'Franco';
    usuarioNuevo.apellido = 'Lippi';
    usuarioNuevo.correo = 'soyflippi@gmail.com';
    usuarioNuevo.dni = '33444555';
    usuarioNuevo.cuil = '20334445554';
    usuarioNuevo.perfil = Perfil.DUEÑO;

    this.usuarioService.crearUsuario(usuarioNuevo).then((usr) => {
      console.log('Documento creado exitósamente!' + usr);
    }, error => console.log(error));
    */

    // Actualizar usuario
/*     const usuarioaAct = new Usuario();

    usuarioaAct.clave = '1234';

    this.usuarioService.actualizarUsuario('cPsrX56K6okB1ZsZUyjP', usuarioaAct).then((usr) => {
      console.log('Documento actualizado exitósamente!' + usr);
    }, error => console.log(error)); */

  }

  onSubmitLogin(): void {
    let usuarioEncontrado = false;
    this.correo = $('#inpCorreoLogin').val();
    this.clave = $('#inpClaveLogin').val();

    if (this.datosValidos(this.correo, this.clave)) {
      for (const usuario of this.listaUsuarios) {
        if (usuario.correo === this.correo && usuario.clave === this.clave) {
          usuarioEncontrado = true;
          break;
        }
      }

      if (usuarioEncontrado) {
        this.moveToHome();
        localStorage.setItem('tipoDeAlta', 'anonimo');
      }
      else {
        this.vibration.vibrar(500);
        $('#errUsuarioLogin').attr('hidden', false);
      }
    }
  }

  moveToHome(): void {
    this.limpiarErrores();
    this.limpiarInputs();
    // this.spinnerRouter.showSpinnerAndNavigate('alta-usuarios', 'loadingContainerLogin', 2000);
    this.spinnerRouter.showSpinnerAndNavigate('home', 'loadingContainerLogin', 2000);
  }

  datosValidos(correo: string, clave: string): boolean {
    let contador = 0;
    if (this.correoValido(correo)) {
      $('#errCorreoLogin').attr('hidden', true);
      contador++;
    }
    else {
      $('#errCorreoLogin').attr('hidden', false);
    }
    if (this.claveValida(clave)) {
      $('#errClaveLogin').attr('hidden', true);
      contador++;
    }
    else {
      $('#errClaveLogin').attr('hidden', false);
    }
    if (contador === 2) {
      return true;
    }
    else {
      this.vibration.vibrar(500);
      return false;
    }
  }

  correoValido(correo: string): boolean {
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    const retorno = regexp.test(correo);
    return retorno;
  }

  claveValida(clave: string): boolean {
    let retorno = true;
    if (clave !== '') {
      if (clave.length === 4) {
        for (const caracter of clave) {
          if (caracter < '0' || caracter > '9') {
            retorno = false;
            break;
          }
        }
      }
      else {
        retorno = false;
      }
    }
    else {
      retorno = false;
    }
    return retorno;
  }

  limpiarErrores(): void {
    $('#errCorreoLogin').attr('hidden', true);
    $('#errClaveLogin').attr('hidden', true);
    $('#errUsuarioLogin').attr('hidden', true);
  }

  limpiarInputs(): void {
    $('#inpCorreoLogin').val('');
    $('#inpClaveLogin').val('');
    // LIMPIAMOS LOS VALORES PORQUE A VECES QUEDAN CARGADOS
    this.correo = '';
    this.clave = '';
  }

  // PATO -> Borrar antes de pasar version
  cargarUsuario(): void {
    $('#inpCorreoLogin').val('lucas@lucas.com');
    $('#inpClaveLogin').val('2706');
    this.correo = 'lucas@lucas.com';
    this.clave = '2706';
  }
}
