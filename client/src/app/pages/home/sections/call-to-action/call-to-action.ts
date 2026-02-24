import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule } from 'lucide-angular';

@Component({
  selector: 'app-call-to-action',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './call-to-action.html',
  styleUrl: './call-to-action.css'
})
export class CallToAction {

}
