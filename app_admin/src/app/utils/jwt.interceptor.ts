import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

export const jwtInterceptor: HttpInterceptorFn = (request, next) => {
  const auth = inject(AuthenticationService);
  const isAuthRequest = /\/(login|register)$/.test(request.url);
  const isOurApi = request.url.startsWith('http://localhost:3000/api/');
  if (!isAuthRequest && isOurApi && auth.isLoggedIn()) {
    request = request.clone({ setHeaders: { Authorization: `Bearer ${auth.getToken()}` } });
  }
  return next(request);
};
