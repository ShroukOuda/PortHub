import { Component } from '@angular/core';
import { Hero } from './sections/hero/hero';
import { Benefits } from './sections/benefits/benefits';
import { About } from './sections/about/about';
import { Users } from './sections/users/users';
import { CallToAction } from './sections/call-to-action/call-to-action';
import { Audience } from './sections/audience/audience';
import { Features } from './sections/features/features';

@Component({
  selector: 'app-home',
  imports: [Hero, Benefits, About, Users, CallToAction, Audience, Features],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}
