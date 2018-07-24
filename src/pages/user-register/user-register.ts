import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-user-register',
  templateUrl: 'user-register.html',
})
export class UserRegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
  }

  ionViewDidLoad() { }

  user = {
    name: '',
    shortDescription: ''
  }

  selectedImage;
  fileName;

  async selectImage(){

    this.selectedImage = await this.userProvider.captureImage();

    this.uploadHandler();
  }

  uploadHandler(){

    const fileName = `image_${ new Date().getTime() }.jpg`;
    this.fileName = fileName;

    this.userProvider.uploadHandler(this.selectedImage, fileName);
  }

  saveUser(){

    this.userProvider.saveUser(this.user.name, this.fileName, this.user.shortDescription);
  }



}

