import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JokeRegisterPage } from '../joke-register/joke-register';
import { Observable } from 'rxjs';
import { JokeProvider } from '../../providers/joke/joke';
import { JokeInfoPage } from '../joke-info/joke-info';

@IonicPage()
@Component({
  selector: 'page-joke-index',
  templateUrl: 'joke-index.html',
})
export class JokeIndexPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private jokeProvider: JokeProvider) {
  }

  ionViewDidLoad() {

    this.userKey = this.navParams.get('userKey')

    this.getJokes();
  }

  // user key to get jokes about a user
  userKey;

  jokes: Observable<any[]>;

  goToJokeRegisterPage(){

    this.navCtrl.push(JokeRegisterPage, { userKey: this.userKey });
  }

  goToJokeInfoPage(jokeInfoKey){

    this.navCtrl.push(JokeInfoPage, { jokeInfoKey: jokeInfoKey });
  }

  getJokes(){

    this.jokes = this.jokeProvider.getJokes(this.userKey);
  }

}
