import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userProvider: UserProvider) {
  }

  ionViewDidLoad() {

    this.userkey = this.navParams.get('userkey');

    this.getUser();
  }

  userkey;

  user;

  selectedImage = '';

  getUser(){

    this.userProvider.getUser(this.userkey).subscribe(x => {

      this.user = x;
    });
  }

  async selectImage(){

    this.selectedImage = await this.userProvider.captureImage();

    // used to show selected image to user
    this.user.profileImageUrl = 'data:image/jpg;base64,' + this.selectedImage;
  }

  editUser(){

    this.userProvider.editUser(this.userkey, this.user, this.selectedImage);
  }
}
