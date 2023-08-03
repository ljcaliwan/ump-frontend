import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenAuthInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(httpRequest.url.includes(`${environment}/user/login`)) {
            return next.handle(httpRequest);
        }
        if(httpRequest.url.includes(`${environment}/user/register`)) {
            return next.handle(httpRequest);
        }
        if(httpRequest.url.includes(`${environment}/user/reset-password`)) {
            return next.handle(httpRequest);
        }

        this.authService.loadToken();
        const token = this.authService.getToken();
        const request = httpRequest.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        return next.handle(request);
    }
}
