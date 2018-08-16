import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ToastController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../user'
import { AngularFireAuth } from 'angularfire2/auth';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { ConnectedPage } from '../pages/connected/connected';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

    // rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;
  user = {} as User;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, private afAuth: AngularFireAuth, private toast: ToastController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage },
      { title: 'Login', component: LoginPage },
      { title: 'Connected', component: ConnectedPage }
    ];

  }

  initializeApp(user:User) {
    this.afAuth.authState.subscribe(data => {
      if(data && data.email && data.uid){
        this.nav.setRoot(ConnectedPage);
      }else{
        this.nav.setRoot(HomePage);
      }
    });
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  async login(user: User) {
    try {
      const result = this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
      if (result) {
        this.nav.setRoot(HomePage);
        this.afAuth.authState.subscribe(data => {
          if (data.email && data.uid) {
            this.toast.create({
              message: `Welcome to APP_NAME, ${data.email}`,
              duration: 3000
            }).present();
          }else {
            this.toast.create({
              message: `Could not find authentication details`,
              duration: 3000
            }).present();
          }
        });
      }
    }
    catch (e) {
      console.error(e);
    }
  }

}
