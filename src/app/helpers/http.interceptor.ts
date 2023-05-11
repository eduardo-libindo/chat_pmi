import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StorageService } from '../services/storage.service';
import { EventBusService } from '../shared/event-bus.service';
import { EventData } from '../shared/event.class';

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {
  private isRefreshing = false;

  constructor(
    private eventBusService: EventBusService
  ) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    // if (!req.headers.has('Content-Type')) {
    //   req = req.clone({
    //     headers: req.headers.set('Content-Type', 'application/json')
    //   });
    // }
    
    // req = req.clone({
    //   withCredentials: true,
    //   // setHeaders: {
    //   //   Authorization: `Bearer ${this.token}`,
    //   // },
    // });

    return next.handle(req).pipe(

      tap({
        next: (event) => {
          if (event instanceof HttpResponse) {
            if (event.status == 401) {
              alert('Acesso não autorizado, voce esta com o acesso publico apenas!');
            }
          }
          return event;
        },
        error: (error) => {
          if (error.status === 401) {
            alert('Acesso não autorizado, voce esta com o acesso publico apenas!');
          } else if (error.status === 404) {
            alert('Página não encontrada!');
          }
        },
      })

      // catchError((error) => {
      //   if (
      //     error instanceof HttpErrorResponse &&
      //     !req.url.includes('auth/signin') &&
      //     error.status === 401
      //   ) {
      //     return this.handle401Error(req, next);
      //   }

      //   return throwError(() => error);
      // }
      
      // )

    );
  }

  // private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
  //   if (!this.isRefreshing) {
  //     this.isRefreshing = true;

  //     if (!this.storageService.getIsLogged()) {
  //       this.eventBusService.emit(new EventData('logout', null));
  //     }
  //   }

  //   return next.handle(request);
  // }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpRequestInterceptor, multi: true },
];