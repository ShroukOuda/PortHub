import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from 'app/shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-features',
  imports: [LucideAngularModule, ScrollRevealDirective],
  templateUrl: './features.html',
  styleUrl: './features.css'
})
export class Features {

}
