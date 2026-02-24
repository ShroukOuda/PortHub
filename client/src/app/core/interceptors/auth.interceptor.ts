import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  
  // Debug logging
  console.log('🔐 Interceptor - Request URL:', req.url);
  console.log('🔐 Interceptor - Token present:', !!token);
  
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log('🔐 Interceptor - Added Authorization header');
    return next(clonedRequest);
  }
  
  console.log('🔐 Interceptor - No token, request sent without auth');
  return next(req);
};
