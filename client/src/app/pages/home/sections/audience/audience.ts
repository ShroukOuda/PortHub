import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from 'app/shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-audience',
  imports: [LucideAngularModule, ScrollRevealDirective],
  templateUrl: './audience.html',
  styleUrl: './audience.css'
})
export class Audience {

}
