import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { UserIndexPage } from '../pages/user-index/user-index';
import { UserProvider } from '../providers/user/user';
import { Camera } from '@ionic-native/camera';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { UserRegisterPage } from '../pages/user-register/user-register';
import { JokeIndexPage } from '../pages/joke-index/joke-index';
import { JokeProvider } from '../providers/joke/joke';
import { JokeRegisterPage } from '../pages/joke-register/joke-register';
import { JokeInfoPage } from '../pages/joke-info/joke-info';
import { FIREBASE_CONFIG } from './myFirebaseConfig/myFirebaseConfig';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    UserIndexPage,
    UserRegisterPage,
    JokeIndexPage,
    JokeRegisterPage,
    JokeInfoPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(FIREBASE_CONFIG),
    AngularFireStorageModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    UserIndexPage,
    UserRegisterPage,
    JokeIndexPage,
    JokeRegisterPage,
    JokeInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    Camera,
    JokeProvider
  ]
})
export class AppModule {}
