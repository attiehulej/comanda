import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Injectable({
  providedIn: 'root'
})
export class SpinnerRouterService {

  constructor(public router: Router) { }

  showSpinnerAndNavigate(route: string, idSpinner: string, time: number): void {
    $(`#${idSpinner}`).attr('hidden', false);
    setTimeout(() => {
      $(`#${idSpinner}`).attr('hidden', true);
      this.router.navigate([route]);
    }, time);
  }
}
