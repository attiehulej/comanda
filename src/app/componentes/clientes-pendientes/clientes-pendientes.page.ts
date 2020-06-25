import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { EstadoUsuario } from 'src/app/enums/estado-usuario.enum';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { FormBuilder } from '@angular/forms';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-clientes-pendientes',
  templateUrl: './clientes-pendientes.page.html',
  styleUrls: ['./clientes-pendientes.page.scss'],
})

export class ClientesPendientesPage implements OnInit {

  usuarios: Observable<any[]>;
  lista: any[];
  perfilUsuarioClientesPendientes;
  imgUsuarioClientesPendientes;
  usuariosPendientes: any[] = [];

  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private utilsService: UtilsService
  ) {
    this.usuarioService.obtenerUsuarios().subscribe(usuarios => {
      this.lista = usuarios;
      for (const usuario of this.lista) {
        if (usuario.estado === EstadoUsuario.PENDIENTE && usuario.perfil === TipoUsuario.CLIENTE_REGISTRADO) {
          this.usuariosPendientes.push(usuario);
        }
      }
    }, error => console.log(error));
  }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      const aux = this.authService.obtenerDetalle(response);
      aux.subscribe(datos => {
        this.perfilUsuarioClientesPendientes = datos.perfil;
        if (datos.foto !== '') {
          this.imgUsuarioClientesPendientes = 'data:image/jpeg;base64,' + datos.foto;
        }
        else {
          this.imgUsuarioClientesPendientes = '../../../assets/defaultFoto.png';
        }
      });
    }).catch((reject: any) => {
      console.log(reject);
    });
  }

  usuarioEstaPendiente(usuario): boolean {
    let retorno = false;
    if (usuario.estado === EstadoUsuario.PENDIENTE) {
      retorno = true;
    }
    return retorno;
  }

  aprobarUsuario(usuario): void {
    this.authService.gestionarUsuario(usuario, EstadoUsuario.APROBADO).then(datos => (console.log(datos))).catch(err => console.log(err));
    this.usuariosPendientes = [];
  }

  declinarUsuario(usuario): void {
    this.authService.gestionarUsuario(usuario, EstadoUsuario.RECHAZADO).then(datos => (console.log(datos))).catch(err => console.log(err));
    this.usuariosPendientes = [];
  }

  volverClientesPendientes(): void {
    this.utilsService.showLoadingAndNavigate('home');
  }
}
