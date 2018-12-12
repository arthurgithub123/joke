import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { JokeProvider } from '../../providers/joke/joke';

@IonicPage()
@Component({
  selector: 'page-joke-register',
  templateUrl: 'joke-register.html',
})
export class JokeRegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private jokeProvider: JokeProvider) {
  }

  ionViewDidLoad() {

    this.userKey = this.navParams.get('userKey');
  }

  joke = {
    description: '',
    text: ''
  }

  userKey;

  selectedImage;

  async selectImage(){

    this.selectedImage = await this.jokeProvider.captureImage();
  }

  saveJoke(){

    this.jokeProvider.saveJoke(this.selectedImage, this.joke.description, this.joke.text, this.userKey);
  }

}
