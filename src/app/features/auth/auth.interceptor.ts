import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth-service';

const PUBLIC_ENDPOINTS = ['/auth/log-in', '/auth/sign-up'];
export const authInterceptor: HttpInterceptorFn = (req, next) => {
const auth = inject(AuthService);
const token = auth.getToken();
const isOurApi = req.url.startsWith("http://localhost:8080");
//either of the url matches
const isPublic = PUBLIC_ENDPOINTS.some(url => req.url.includes(url));
if (token && isOurApi && !isPublic) {
req = req.clone({
setHeaders: { Authorization: `Bearer ${token}` }
});
}
return next(req);
};