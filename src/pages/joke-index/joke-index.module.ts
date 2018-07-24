import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { JokeIndexPage } from './joke-index';

@NgModule({
  declarations: [
    JokeIndexPage,
  ],
  imports: [
    IonicPageModule.forChild(JokeIndexPage),
  ],
})
export class JokeIndexPageModule {}
