import { Injectable } from '@angular/core';

import { Camera, CameraOptions } from '@ionic-native/camera';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFireDatabase } from 'angularfire2/database';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class JokeProvider {

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

  createUploadTask(file: string, fileName: string) {

    let image = 'data:image/jpg;base64,' + file;

    this.storage.ref('joke/' + fileName).putString(image, 'data_url');
  }

  // show a confirm alert to know if the user wants the selected image
  uploadHandler(file, fileName) {

    const confirm = this.alertCtrl.create({

      title: 'Usar imagem selecionada ?',
      message: '',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => { }
        },
        {
          text: 'OK',
          handler: () => {

            this.createUploadTask(file, fileName);
          }
        }
      ]
    });

    confirm.present();
  }

  saveJoke(fileName: string, jokeDescription: string, jokeText: string, userKey: string){

    if(fileName == '' || fileName == null || fileName == undefined){

      const joke = this.db.list('jokes').push({ description: jokeDescription, userKey: userKey, jokeInfoKey: '' });
      let pushedJokeKey = joke.key;

      const jokeInfo = this.db.list('jokeInfo').push({
        description:    jokeDescription,
        text:           jokeText,
        imageName:      '',
        imageUrl:       '',
        userKey:        userKey
      });

      // get pushed jokeInfo key to update pushed joke's jokeInfoKey property
      let pushedJokeInfoKey = jokeInfo.key;

      this.db.list('jokes').update(pushedJokeKey, { jokeInfoKey: pushedJokeInfoKey });
    }
    else
    {
      const joke = this.db.list('jokes').push({ description: jokeDescription, userKey: userKey, jokeInfoKey: '' });
      let pushedJokeKey = joke.key;

      const jokeInfo = this.db.list('jokeInfo').push({

        description:    jokeDescription,
        text:           jokeText,
        imageName:      fileName,
        imageUrl:       '',
        userKey:        userKey
      });

      // get pushed jokeInfo key to update pushed joke's jokeInfoKey property
      let pushedJokeInfoKey = jokeInfo.key;

      this.db.list('jokes').update(pushedJokeKey, { jokeInfoKey: pushedJokeInfoKey });

      // get image by name to get its download url and set jokeInfo's imageUrl property
      let imageUrl: Observable<string | null>;
      const ref = this.storage.ref('joke/' + fileName);

      ref.getDownloadURL().subscribe(x => {

        this.db.list('jokeInfo').update(pushedJokeInfoKey, { imageUrl: x })
      });
    }
  }

  // return jokes about the selected user from user's list
  getJokes(userkey: string){

    return this.db.list('jokes', ref => ref.orderByChild('userKey').equalTo(userkey)).snapshotChanges().pipe(

      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getJokeInfo(jokeInfoKey: string){

    return this.db.object('jokeInfo/' + jokeInfoKey).snapshotChanges();
  }

}
