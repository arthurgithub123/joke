import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JokeRegisterPage } from './joke-register';

@NgModule({
  declarations: [
    JokeRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(JokeRegisterPage),
  ],
})
export class JokeRegisterPageModule {}
