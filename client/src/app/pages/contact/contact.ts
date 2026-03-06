import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from '../../shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-contact',
  imports: [LucideAngularModule, ScrollRevealDirective],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

}
