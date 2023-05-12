import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    
    req = req.clone({
      withCredentials: true,
    });

    return next.handle(req).pipe(
      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 200) {
              console.log(
                'Acesso autorizado, na rota => ' + event.url
              );
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            console.log(
              'Voce esta com o acesso publico apenas, faça login para ter acesso completo!'
            );
          } else if (error.status === 404) {
            alert('Página não encontrada!');
          }
        },
      })
    );
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];