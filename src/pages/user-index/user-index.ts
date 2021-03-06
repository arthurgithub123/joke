import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-user-index',
  templateUrl: 'user-index.html',
})
export class UserIndexPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
  }

  ionViewDidLoad() {

    this.getUsers();
  }

  users: Observable<any[]>;

  getUsers(){

    this.users = this.userProvider.getUsers();
  }

  goToUserRegisterPage(){
    this.navCtrl.push('UserRegisterPage');
  }

  goToJokeIndexPage(userKey){

    this.navCtrl.push('JokeIndexPage', { userKey: userKey });
  }

  goToUserEditPage(userKey){

  this.navCtrl.push('UserEditPage', { userkey: userKey });
  }
}
