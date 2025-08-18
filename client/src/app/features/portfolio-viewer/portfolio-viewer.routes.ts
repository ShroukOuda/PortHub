import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { About } from './components/about/about';
import { Projects } from './components/projects/projects';
// import { Contact } from './components/contact/contact';
import { Education } from './components/education/education';
import { Services } from './components/services/services';
import { Skills } from './components/skills/skills';
import { Experience } from './components/experience/experience';
import { Testimonials } from './components/testimonials/testimonials';
import { Certificates } from './components/certificates/certificates';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'education', component: Education },
    { path: 'skills', component: Skills },
    { path: 'experience', component: Experience },
    { path: 'services', component: Services },
    { path: 'projects', component: Projects },
    { path: 'certificates', component: Certificates },
    { path: 'testimonials', component: Testimonials },
    // { path: 'contact', component: Contact },

];