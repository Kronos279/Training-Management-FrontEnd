import { HttpErrorResponse, HttpHeaders, HttpInterceptorFn } from '@angular/common/http';
import { AuthServiceService } from './auth-service.service';
import { inject } from '@angular/core';
import { catchError, throwError } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthServiceService);
  const authToken = authService.getToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });
  console.log(authReq);
  return next(authReq).pipe(
    catchError((err: any)=>{
      if(err instanceof HttpErrorResponse){
        if(err.status === 403){
          console.error('Unauthorized request:', err);
          alert("Enter valid Credentials")
        }
        else{
          console.error("HTTP error :",err);
        }
      }
      else{
        console.error('An error occurred:', err);
      }
      return throwError(() => err);
    })
  );
};






