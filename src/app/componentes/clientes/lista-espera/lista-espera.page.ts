import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-lista-espera',
  templateUrl: './lista-espera.page.html',
  styleUrls: ['./lista-espera.page.scss'],
})
export class ListaEsperaPage implements OnInit {

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  atras(): void {
    this.utilsService.showLoadingAndNavigate('clientes');
  }

}
