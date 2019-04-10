import { NgModule  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicSwingModule } from 'ionic-swing';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { Facebook } from '@ionic-native/facebook/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx'
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { NativePageTransitions } from '@ionic-native/native-page-transitions/ngx';
import { LocalNotifications } from '@ionic-native/local-notifications/ngx';
import { ModalPage } from './pages/modal/modal.page';
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileChooser } from '@ionic-native/file-chooser/ngx';


@NgModule({
  declarations: [AppComponent, ModalPage],
  entryComponents: [ModalPage],
  imports: [BrowserModule, HttpClientModule,IonicSwingModule, IonicModule.forRoot(), AppRoutingModule],
 
  providers: [
    StatusBar,
    Facebook,
    Camera,
    File,
    FileChooser,
    InAppBrowser,
    NativePageTransitions,
    LocalNotifications,
    Geolocation,
    NativeGeocoder,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
