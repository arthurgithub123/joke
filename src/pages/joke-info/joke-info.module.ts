import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JokeInfoPage } from './joke-info';

@NgModule({
  declarations: [
    JokeInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(JokeInfoPage),
  ],
})
export class JokeInfoPageModule {}
