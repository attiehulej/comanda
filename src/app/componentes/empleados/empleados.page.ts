import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.page.html',
  styleUrls: ['./empleados.page.scss'],
})
export class EmpleadosPage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  volverEmpleados(): void
  {
    $('#loadingContainerEmpleados').attr('hidden', false);
    setTimeout(() => {
      $('#loadingContainerEmpleados').attr('hidden', true);
      this.router.navigate(['/login']); 
    }, 2000);
  }
}
