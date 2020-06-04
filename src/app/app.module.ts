import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { Camera } from '@ionic-native/camera/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';

import { AngularFireModule } from '@angular/fire'; // PATO
// import { AngularFireModule } from 'angularfire2'; // AGREGO LUCAS

import { environment } from '../environments/environment';
//
import { AngularFirestoreModule, SETTINGS } from '@angular/fire/firestore'; // PATO
// import { AngularFirestoreModule } from 'angularfire2/firestore'; // AGREGO LUCAS
//
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { HomeComponent } from './componentes/home/home.component';
import { QrComponent } from './componentes/qr/qr.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QrComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule, //PROBADO LUCAS
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: SETTINGS, useValue: {} }, // PATO
    Vibration,
    Camera
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
