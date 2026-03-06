import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';
import { ScrollRevealDirective } from 'app/shared/directives/scroll-reveal.directive';

@Component({
  selector: 'app-call-to-action',
  imports: [RouterLink, LucideAngularModule, ScrollRevealDirective],
  templateUrl: './call-to-action.html',
  styleUrl: './call-to-action.css'
})
export class CallToAction {

}
