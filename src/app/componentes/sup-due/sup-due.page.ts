import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-sup-due',
  templateUrl: './sup-due.page.html',
  styleUrls: ['./sup-due.page.scss'],
})
export class SupDuePage implements OnInit {

  constructor(public router: Router) { }

  ngOnInit() {
  }

  volverSupDue(): void
  {
    $('#loadingContainerSupDue').attr('hidden', false);
    setTimeout(() => {
      $('#loadingContainerSupDue').attr('hidden', true);
      this.router.navigate(['/login']); 
    }, 2000);
  }
}
