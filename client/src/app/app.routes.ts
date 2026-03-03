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
import { DashboardLayoutComponent } from './features/dashboard/dashboard-layout/dashboard-layout';
import { DashboardOverviewComponent } from './features/dashboard/dashboard-overview/dashboard-overview';
import { PortfolioSettingsComponent } from './features/dashboard/portfolio-settings/portfolio-settings';
import { ThemeEditorComponent } from './features/dashboard/theme-editor/theme-editor';
import { ProjectsManagerComponent } from './features/dashboard/projects-manager/projects-manager';
import { SkillsManagerComponent } from './features/dashboard/skills-manager/skills-manager';

// Admin Components
import { AdminLayoutComponent } from './features/admin/admin-layout/admin-layout';
import { AdminOverviewComponent } from './features/admin/admin-overview/admin-overview';
import { AdminUsersComponent } from './features/admin/admin-users/admin-users';
import { AdminPortfoliosComponent } from './features/admin/admin-portfolios/admin-portfolios';
import { AdminSkillsComponent } from './features/admin/admin-skills/admin-skills';

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
        component: DashboardLayoutComponent,
        canActivate: [authGuard],
        children: [
            { path: '', component: DashboardOverviewComponent },
            { path: 'portfolio', component: PortfolioSettingsComponent },
            { path: 'theme', component: ThemeEditorComponent },
            { path: 'projects', component: ProjectsManagerComponent },
            { path: 'skills', component: SkillsManagerComponent },
            { path: 'services', loadComponent: () => import('./features/dashboard/services-manager/services-manager').then(m => m.ServicesManagerComponent) },
            { path: 'education', loadComponent: () => import('./features/dashboard/education-manager/education-manager').then(m => m.EducationManagerComponent) },
            { path: 'experience', loadComponent: () => import('./features/dashboard/experience-manager/experience-manager').then(m => m.ExperienceManagerComponent) },
            { path: 'certificates', loadComponent: () => import('./features/dashboard/certificates-manager/certificates-manager').then(m => m.CertificatesManagerComponent) },
            { path: 'testimonials', loadComponent: () => import('./features/dashboard/testimonials-manager/testimonials-manager').then(m => m.TestimonialsManagerComponent) },
            { path: 'profile', loadComponent: () => import('./features/dashboard/profile-settings/profile-settings').then(m => m.ProfileSettingsComponent) },
        ]
    },
    
    // Admin routes (protected, admin only)
    {
        path: 'admin',
        component: AdminLayoutComponent,
        canActivate: [adminGuard],
        children: [
            { path: '', component: AdminOverviewComponent },
            { path: 'users', component: AdminUsersComponent },
            { path: 'portfolios', component: AdminPortfoliosComponent },
            { path: 'skills', component: AdminSkillsComponent },
        ]
    },
    
    // 404 Not Found - must be last
    { path: '**', loadComponent: () => import('./shared/components/not-found/not-found').then(m => m.NotFoundComponent) }
];
