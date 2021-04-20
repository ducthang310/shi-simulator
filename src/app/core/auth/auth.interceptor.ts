import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';

@Injectable()

export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('access_token');

    if (accessToken) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + accessToken)
      });

      return next.handle(cloned).pipe(tap(() => {
        }, (err: any) => {
          if (err instanceof HttpErrorResponse && err.status === 401) {
            this.router.navigate(['/login']);
          }
        }, () => {
          //
        }
      ));
    } else {
      return next.handle(req);
    }
  }
}
