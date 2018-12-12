import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class UserProvider {

  constructor(private camera: Camera, private storage: AngularFireStorage,
              private db: AngularFireDatabase, private alertCtrl: AlertController) { }

  async captureImage() {
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    return await this.camera.getPicture(options)
  }

  async saveUser(userName: string, selectedImage: string, shortDescription: string){

    if (selectedImage == '' || selectedImage == null || selectedImage == undefined){

      const user = this.db.list('users').push({ name: userName, profileImageName: 'profile_noimage.jpg', shortDescription: shortDescription, profileImageUrl: '' });
      let pushedUserKey = user.key;

      const ref = this.storage.ref('profile/profile_noimage.jpg');

      ref.getDownloadURL().subscribe((x) => {

        this.db.list('users').update(pushedUserKey, { profileImageUrl: x });
      });
    }
    else {

      // creates file image name and save image in firebase
      let fileName = `image_${ new Date().getTime() }.jpg`;

      let image = 'data:image/jpg;base64,' + selectedImage;

      await this.storage.ref('profile/' + fileName).putString(image, 'data_url');

      // saves user and get its key to update profileImageUrl wich was saved with no value
      const user = this.db.list('users').push({ name: userName, profileImageName: fileName, shortDescription: shortDescription, profileImageUrl: '' });
      let pushedUserKey = user.key;

      // gets saved image downloadURL by its path wich are folder and file name
      const ref = this.storage.ref('profile/' + fileName);

      ref.getDownloadURL().subscribe((x) => {

        this.db.list('users').update(pushedUserKey, { profileImageUrl: x });
      });
    }
  }

  getUsers(){

    return this.db.list('users').snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

}
