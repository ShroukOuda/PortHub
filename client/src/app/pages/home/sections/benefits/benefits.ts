import { Component } from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from 'app/shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-benefits',
  imports: [LucideAngularModule, ScrollRevealDirective],
  templateUrl: './benefits.html',
  styleUrl: './benefits.css'
})
export class Benefits {

}
