import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'portfolio/:userId',
    renderMode: RenderMode.Server,
  },
  {
    path: 'portfolio/:userId/**',
    renderMode: RenderMode.Server,
  },
  {
    path: 'admin/**',
    renderMode: RenderMode.Client,
  },
  {
    path: 'dashboard/**',
    renderMode: RenderMode.Client,
  },
  {
    path: '**',
    renderMode: RenderMode.Server,
  },
];
