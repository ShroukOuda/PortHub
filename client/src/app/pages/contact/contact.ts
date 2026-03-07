import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';
import { MouseFollowDirective } from '../../shared/directives/mouse-follow.directive';

@Component({
  selector: 'app-contact',
  imports: [LucideAngularModule, ScrollRevealDirective, MouseFollowDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

}
