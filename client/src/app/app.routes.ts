import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Portfolios } from './pages/portfolios/portfolios';
import { Contact } from './pages/contact/contact';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';
import { AuthCallback } from './auth/callback/callback';
import { PortfolioView } from './features/portfolio-viewer/pages/portfolio-view/portfolio-view';
import { routes as portfolioRoutes } from './features/portfolio-viewer/portfolio-viewer.routes';
import { authGuard, adminGuard, guestGuard } from './core/guards/auth.guard';

// Dashboard Components
import { DashboardLayout } from './features/dashboard/dashboard-layout/dashboard-layout';
import { DashboardOverview } from './features/dashboard/dashboard-overview/dashboard-overview';
import { PortfolioSettings } from './features/dashboard/portfolio-settings/portfolio-settings';
import { ThemeEditor } from './features/dashboard/theme-editor/theme-editor';
import { ProjectsManager } from './features/dashboard/projects-manager/projects-manager';
import { SkillsManager } from './features/dashboard/skills-manager/skills-manager';

// Admin Components
import { AdminLayout } from './features/admin/admin-layout/admin-layout';
import { AdminOverview } from './features/admin/admin-overview/admin-overview';
import { AdminUsers } from './features/admin/admin-users/admin-users';
import { AdminPortfolios } from './features/admin/admin-portfolios/admin-portfolios';
import { AdminSkills } from './features/admin/admin-skills/admin-skills';
import { AdminJobTitles } from './features/admin/admin-job-titles/admin-job-titles';
import { AdminCountries } from './features/admin/admin-countries/admin-countries';

export const routes: Routes = [
    // Public routes
    {path: '', component: Home},
    {path: 'about', component: About},
    {path: 'portfolios', component: Portfolios},
    {path: 'portfolio-view/:userId', component: PortfolioView, children: portfolioRoutes},
    {path: 'contact', component: Contact},
    
    // Auth routes (only for guests)
    {path: 'login', component: Login, canActivate: [guestGuard]},
    {path: 'signup', component: Signup, canActivate: [guestGuard]},
    {path: 'forgot-password', loadComponent: () => import('./auth/forgot-password/forgot-password').then(m => m.ForgotPasswordComponent), canActivate: [guestGuard]},
    {path: 'auth/callback', component: AuthCallback},
    
    // User Dashboard routes (protected)
    {
        path: 'dashboard',
        component: DashboardLayout,
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardOverview },
            { path: 'portfolio', component: PortfolioSettings },
            { path: 'theme', component: ThemeEditor },
            { path: 'projects', component: ProjectsManager },
            { path: 'skills', component: SkillsManager },
            { path: 'services', loadComponent: () => import('./features/dashboard/services-manager/services-manager').then(m => m.ServicesManager) },
            { path: 'education', loadComponent: () => import('./features/dashboard/education-manager/education-manager').then(m => m.EducationManager) },
            { path: 'experience', loadComponent: () => import('./features/dashboard/experience-manager/experience-manager').then(m => m.ExperienceManager) },
            { path: 'certificates', loadComponent: () => import('./features/dashboard/certificates-manager/certificates-manager').then(m => m.CertificatesManager) },
            { path: 'testimonials', loadComponent: () => import('./features/dashboard/testimonials-manager/testimonials-manager').then(m => m.TestimonialsManager) },
            { path: 'profile', loadComponent: () => import('./features/dashboard/profile-settings/profile-settings').then(m => m.ProfileSettings) },
        ]
    },
    
    // Admin routes (protected, admin only)
    {
        path: 'admin',
        component: AdminLayout,
        canActivate: [adminGuard],
        children: [
            { path: '', component: AdminOverview },
            { path: 'users', component: AdminUsers },
            { path: 'portfolios', component: AdminPortfolios },
            { path: 'skills', component: AdminSkills },
            { path: 'job-titles', component: AdminJobTitles },
            { path: 'countries', component: AdminCountries },
        ]
    },
    
    // 404 Not Found - must be last
    { path: '**', loadComponent: () => import('./shared/components/not-found/not-found').then(m => m.NotFound) }
];
