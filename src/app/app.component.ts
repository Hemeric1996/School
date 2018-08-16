import { Component, ViewChild } from '@angular/core';
import { Platform, NavController, NavParams } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { MenuController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
// import { RootRenderNodes } from '@angular/core/src/view';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('mycontent') nav: NavController
  public rootPage:string = 'LoginPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private angularFireAuth: AngularFireAuth) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      angularFireAuth.auth.onAuthStateChanged(function(user){
        if (user) {
          this.rootPage = 'HomePage';
        }else{
          this.rootPage = 'LoginPage';
        }
      });
    });
  }
  ngOnInit(){
    this.nav.push(this.rootPage);
  }

  login(email, password) {
    this.angularFireAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
      this.nav.setRoot('HomePage', {email})
    });
  }

 //  closeMenu() {
 //   this.menuCtrl.close();
 // }
}
