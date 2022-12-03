import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, finalize, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable()
export class AuthHandlerInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('accessToken');
    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          authorization: `Bearer ${ token }`
        }
      });
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 0: {
            Swal.fire({
              icon: 'info',
              title: 'Sesión cerrada!',
              text: 'HASTA PRONTO!',
              showConfirmButton: false,
            });
            this.router.navigate(['inicio']);            
            break;
          }
          case 401: {
            Swal.fire({
              icon: 'error',
              title: 'Error: ' + error.status + ' !!!',
              text: 'NO AUTORIZADO. Inicie sesión por favor.',
              footer: ''
            });
            this.router.navigate(['inicio']);
            
            break;
          }
          case 404: {
            Swal.fire({
              icon: 'error',
              title: 'Error: ' + error.status + ' !!!',
              text: 'Problema en el sistema, comuniquese con el Desarrollador.',
              footer: ''
            });
            break;
          }
          case 500: {
            Swal.fire({
              icon: 'error',
              title: 'Error: ' + error.status + ' !!!',
              text: 'PROBLEMAS DE CONEXION. EL SERVIDOR ESTA FUERA DE LINEA',
              footer: ''
            });
            break;
          }
        }
        return throwError(error);
      })) as Observable<HttpEvent<any>>;
  }
}
