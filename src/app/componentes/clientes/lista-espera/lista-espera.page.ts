import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';
import { ListaEsperaService } from 'src/app/servicios/lista-espera.service';
import { AuthService } from 'src/app/servicios/auth.service';
import { ListaEspera } from 'src/app/clases/lista-espera';
import { PedidoService } from 'src/app/servicios/pedido.service';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  usuario: any;
  pedido = null;

  constructor(
    private utilsService: UtilsService,
    private listaEsperaService: ListaEsperaService,
    private authService: AuthService,
    private pedidoService: PedidoService
  ) { }

  ngOnInit() {
    this.authService.currentUser().then((response: firebase.User) => {
      this.authService.obtenerDetalle(response).subscribe(datos => {
        this.usuario = datos;
        this.obtenerEstado();
      });
    });
  }

  obtenerEstado() {
    this.utilsService.presentLoading();
    this.pedidoService.obtenerPedidosActivos(this.usuario).subscribe(pedido => {
      if (pedido && pedido.length === 0) { // Si no tiene pedidos en cursos
        // Validamos lista de espera
        this.listaEsperaService.obtenerUsuario(this.usuario.id).subscribe(lista => {
          this.utilsService.dismissLoading();
          if (lista && lista.length === 0) { // Si no esta en la lista de espera, lo agregamos
            this.agregarListaEspera();
          }
        });
      } else { // Si tiene pedido en curso, le avisamos que ya tiene mesa asignada
        this.pedido = pedido;
      }
    });

  }

  agregarListaEspera() {
    const listE = new ListaEspera();
    listE.usuario = this.usuario;
    this.listaEsperaService.agregarALista(listE);
  }


  atras(): void {
    this.utilsService.showLoadingAndNavigate('clientes');
  }

}
