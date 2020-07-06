import { Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/servicios/utils.service';

@Component({
  selector: 'app-clientes-espera',
  templateUrl: './clientes-espera.page.html',
  styleUrls: ['./clientes-espera.page.scss'],
})
export class ClientesEsperaPage implements OnInit {

  constructor(
    private utilsService: UtilsService
  ) { }

  ngOnInit() {
  }

  atras(): void {
    this.utilsService.showLoadingAndNavigate('home');
  }

}
