import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../clases/usuario';
import { UsuarioService } from '../../servicios/usuario.service';
import { AuthService } from '../../servicios/auth.service';
import { UtilsService } from '../../servicios/utils.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent implements OnInit {
  @Input() titulo: string;
  @Input() backBtn: string;
  @Input() usuario: Usuario;

  constructor(
    public usuarioService: UsuarioService,
    private authService: AuthService,
    private utilsService: UtilsService,
  ) { }

  ngOnInit() {}

  logOut(): void {
    this.authService.logout();
    this.utilsService.showLoadingAndNavigate('inicio');
  }
}
