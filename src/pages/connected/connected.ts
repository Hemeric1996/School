import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { User } from '../user'
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the ConnectedPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-connected',
  templateUrl: 'connected.html',
})
export class ConnectedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth, private toast: ToastController,) {
  }

  ionViewDidLoad() {
    // let view = this.nav.getActive();
    var current_page = this.navCtrl.getActive().component.name ;
    console.log(this.current_page);
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
