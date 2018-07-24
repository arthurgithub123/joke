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
  fileName;

  async selectImage(){

    this.selectedImage = await this.jokeProvider.captureImage();

    this.uploadHandler();
  }

  uploadHandler(){

    const fileName = `image_${ new Date().getTime() }.jpg`;
    this.fileName = fileName;

    this.jokeProvider.uploadHandler(this.selectedImage, fileName);
  }

  saveJoke(){

    this.jokeProvider.saveJoke(this.fileName, this.joke.description, this.joke.text, this.userKey);
  }

}
