import { Component, signal } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Header } from './shared/components/header/header';
import { Footer } from './shared/components/footer/footer';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Footer, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('client');
  showMainLayout = true;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;

      // Check if this is a wildcard (404) route
      let route = this.activatedRoute;
      while (route.firstChild) {
        route = route.firstChild;
      }
      const is404 = route.snapshot.routeConfig?.path === '**';

      // Hide main header/footer for portfolio-view, dashboard, admin, and 404 routes
      this.showMainLayout = !is404 &&
                            !url.startsWith('/portfolio-view') && 
                            !url.startsWith('/dashboard') && 
                            !url.startsWith('/admin');
    });
  }
}
