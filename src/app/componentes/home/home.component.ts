import { Component, OnInit } from '@angular/core';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  constructor(public spinnerRouter : SpinnerRouterService) { }

  ngOnInit() {}

  volverHome(): void
  {
    this.spinnerRouter.showSpinnerAndNavigate('login', 'loadingContainerHome', 2000);
  }
}
