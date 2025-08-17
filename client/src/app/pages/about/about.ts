import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faHeart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-about',
  imports: [FontAwesomeModule],
  templateUrl: './about.html',
  styleUrl: './about.css'
})
export class About {
  faArrowRight = faArrowRight;
  faHeart = faHeart;

}
