import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Portfolios } from './pages/portfolios/portfolios';
import { Contact } from './pages/contact/contact';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'portfolios', component: Portfolios},
    {path: 'contact', component: Contact}
];
