import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Portfolios } from './pages/portfolios/portfolios';
import { Contact } from './pages/contact/contact';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { PortfolioView } from './features/portfolio-viewer/pages/portfolio-view/portfolio-view';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'portfolios', component: Portfolios},
    {path: 'portfolio-view/:userId', component: PortfolioView},
    {path: 'contact', component: Contact},
    {path: 'login', component: Login},
    {path: 'signup', component: Signup}
];
