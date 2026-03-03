# PortHub — Client (Angular SSR)

Frontend application for the PortHub portfolio builder, built with **Angular 20**, **Tailwind CSS 4**, and **Server-Side Rendering**.

## Tech Stack

- **Framework**: Angular 20.1 (standalone components, signals)
- **Styling**: Tailwind CSS 4.1
- **Charts**: ng2-charts + Chart.js 4
- **Icons**: Lucide Angular
- **SSR**: @angular/ssr
- **Testing**: Karma + Jasmine

## Getting Started

### Prerequisites

- Node.js ≥ 22
- npm ≥ 10

### Installation

```bash
npm install --legacy-peer-deps
```

### Development Server

```bash
npm start
# Opens http://localhost:4200
```

### Build for Production (with SSR)

```bash
npm run build
npm run serve:ssr
# Serves on http://localhost:4000
```

### Run Tests

```bash
npm test
```

## Project Structure

```
client/
├── src/
│   ├── main.ts                    # Browser bootstrap
│   ├── main.server.ts             # SSR bootstrap
│   ├── index.html                 # HTML entry point
│   ├── styles.css                 # Global styles + Tailwind
│   ├── environments/
│   │   └── environment.ts         # API URL configuration
│   └── app/
│       ├── app.ts                 # Root component
│       ├── app.config.ts          # App providers (browser)
│       ├── app.config.server.ts   # App providers (SSR)
│       ├── app.routes.ts          # Client routes
│       ├── app.routes.server.ts   # SSR render modes
│       ├── auth/                  # Login & Signup pages
│       │   ├── login/
│       │   └── signup/
│       ├── core/
│       │   ├── models/            # TypeScript interfaces
│       │   ├── services/          # API services
│       │   └── interceptors/      # HTTP interceptors
│       ├── features/
│       │   ├── admin/             # Admin panel
│       │   │   ├── admin-layout/
│       │   │   ├── admin-overview/
│       │   │   ├── admin-users/
│       │   │   ├── admin-portfolios/
│       │   │   └── admin-skills/
│       │   ├── dashboard/         # User dashboard
│       │   │   ├── dashboard-layout/
│       │   │   ├── profile-settings/
│       │   │   ├── portfolio-manager/
│       │   │   ├── projects-manager/
│       │   │   ├── skills-manager/
│       │   │   ├── services-manager/
│       │   │   ├── education-manager/
│       │   │   ├── experience-manager/
│       │   │   ├── certificates-manager/
│       │   │   └── testimonials-manager/
│       │   └── portfolio-viewer/  # Public portfolio pages
│       │       └── components/
│       ├── pages/                 # Static pages
│       │   ├── home/
│       │   ├── about/
│       │   ├── contact/
│       │   └── portfolios/
│       └── shared/
│           └── components/        # Reusable components
│               ├── header/
│               └── footer/
├── angular.json                   # Angular CLI config
├── tsconfig.json                  # Base TypeScript config
├── Dockerfile                     # Production Docker image
└── package.json
```

## Key Features

### Pages
- **Home** — Landing page with stats and featured portfolios
- **Portfolios** — Browse all public portfolios with pagination
- **About / Contact** — Informational pages

### Dashboard (Authenticated Users)
- Profile settings with image upload
- Portfolio section managers (projects, skills, services, etc.)
- Skills selection from admin-defined predefined skills

### Admin Panel
- User management with server-side pagination
- Portfolio management
- Skill definitions CRUD (categories, active/inactive toggle)
- Analytics dashboard with charts (registrations, countries, roles)

### Portfolio Viewer
- Dynamic public portfolio pages (`/portfolio/:userId`)
- Multiple template support
- Custom color theming via CSS variables
- Initials avatar fallback when no profile photo

### SSR (Server-Side Rendering)
- Portfolio pages are server-rendered for SEO
- Dashboard and admin pages use client-side rendering
- Configured via `app.routes.server.ts` render modes

## Environment Configuration

Edit `src/environments/environment.ts`:

```typescript
export const environment = {
  apiUrl: 'http://localhost:3000'
};
```

## Docker

```bash
docker build -t porthub-client .
docker run -p 4000:4000 porthub-client
```

Or use the root `docker-compose.yml` for the full stack.

## License

ISC
