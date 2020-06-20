import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore'; // PATO
import { VibrationService } from 'src/app/servicios/vibration.service';
import { SpinnerRouterService } from 'src/app/servicios/spinner-router.service';
import { UsuarioService } from 'src/app/servicios/usuario.service';
import { Usuario } from 'src/app/clases/usuario';
import { TipoUsuario } from 'src/app/enums/tipo-usuario.enum';
import { FormBuilder, FormGroup, Validators, FormsModule, FormControl, Form } from '@angular/forms';
import { ToastService } from '../../servicios/toast.service';
import { AuthService } from '../../servicios/auth.service';
import { rejects } from 'assert';
import { EstadoUsuario } from 'src/app/enums/estado-usuario.enum';

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
  public formLogin: FormGroup;

  constructor(
    public router: Router,
    public db: AngularFirestore,
    public vibration: VibrationService,
    public spinnerRouter: SpinnerRouterService,
    public usuarioService: UsuarioService,
    public fb: FormBuilder,
    public toast : ToastService,
    public servicioAlta : AuthService
  )
  {}

  ngOnInit() 
  {
    this.formLogin = this.fb.group
    ({
      correoLogin: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')]],
      claveLogin: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]*')]],
    });
  }

  onSubmitLogin(): void 
  {
    if(this.errorFomularioAltaUsarios() == false) 
    {
      let usuario = new Usuario();
      usuario.correo = this.formLogin.controls.correoLogin.value;
      usuario.clave = this.formLogin.controls.claveLogin.value;
      this.servicioAlta.signIn(usuario)
      .then((response) => {
        
        response.subscribe(usuario => {
          if(usuario.estado == EstadoUsuario.APROBADO)
          {
            this.formLogin.reset();
            this.moveToHome();
          }
          else
          {
            this.toast.presentToast("SU PETICION AUN NO A SIDO ACEPTADA");
          }
        }),(err => 
          {console.log(err);
        });
      })
      .catch((reject : any) => {
        alert(reject);
      });
    }
    else
    {
      this.toast.presentToast("Datos Invalidos");
      this.markAllAsDirtyAltaUsuarios(this.formLogin);
    }
  }

  private markAllAsDirtyAltaUsuarios(formGroup: FormGroup): void
  {
    (<any>Object).values(formGroup.controls).forEach(control => {
      control.markAsDirty();
    });
  }

  errorFomularioAltaUsarios(): boolean
  {
    let retorno: boolean = true;
    if(this.formLogin.controls.correoLogin.valid && this.formLogin.controls.claveLogin.valid)
    {
      retorno = false;
    }
    return retorno;
  }

  errorEnControlLogin(control : string): boolean
  {
    let retorno = false;
    switch(control)
    {
      case 'correoLogin':
        if(this.formLogin.controls.correoLogin.valid || this.formLogin.controls.correoLogin.pristine)
        {
          retorno = false;
        }
        else
        {
          //this.vibration.vibrar(2000);
          retorno = true;
        }
        break;
      case 'claveLogin':
        if(this.formLogin.controls.claveLogin.valid || this.formLogin.controls.claveLogin.pristine)
        {
          retorno = false;
        }
        else
        {
          //this.vibration.vibrar(2000);
          retorno = true;
        }
        break;
    }
    return retorno;
  }

  moveToHome(): void 
  {
    this.spinnerRouter.showSpinnerAndNavigate('home', 'loadingContainerLogin', 2000);
  }

  limpiarLogin(): void 
  {
    this.formLogin.reset();
  }
}