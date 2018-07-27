import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JokeProvider } from '../../providers/joke/joke';

@IonicPage()
@Component({
  selector: 'page-joke-info',
  templateUrl: 'joke-info.html',
})
export class JokeInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private jokeProvider: JokeProvider) {
  }

  ionViewDidLoad() {

    this.jokeInfoKey = this.navParams.get('jokeInfoKey');

    this.getJokeInfo();
  }

  // used to get info about a selected joke
  jokeInfoKey;

  jokeInfo;

  getJokeInfo(){

    this.jokeProvider.getJokeInfo(this.jokeInfoKey).subscribe(x => {

      this.jokeInfo = x.payload.val();
    });

  }


}
