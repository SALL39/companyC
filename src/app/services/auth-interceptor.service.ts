import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { catchError, filter, take, switchMap, tap } from "rxjs/operators";
import { Observable, throwError } from 'rxjs';
import { CredentialsService } from './credentials.service';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let tokenInfo: any =  {token: ''}
    if (sessionStorage.getItem("rapidadmin_key")) {
      tokenInfo = sessionStorage.getItem("rapidadmin_key");
      tokenInfo = tokenInfo ? JSON.parse(tokenInfo) : null;
    }
    const headers = new HttpHeaders({
      'x-rapidadmin-token':  tokenInfo ? tokenInfo.token : ''
    });
    console.log(headers, "aa")
    request = request.clone({ headers });
    // return next.handle(request);
    return next
      .handle(request).pipe(
        tap( (err: any) => {
          if (err instanceof HttpErrorResponse) {
            // token expired redirect to login
            if (err.status === 401) {
              // tslint:disable-next-line:triple-equals
              // if (this.userGroup == GlobalVariable.IS_ADMIN) {
              //   sessionStorage.clear();
              //   this.router.navigate(['admin/login']);
              //   // tslint:disable-next-line:triple-equals
              // } else if (this.userGroup == GlobalVariable.IS_AGENT) {
              //   sessionStorage.clear();
              //   const branch = sessionStorage.getItem('branch');
              //   if (branch) {
              //     sessionStorage.clear();
              //     this.router.navigate(['agent/login/' + branch]);
              //   } else {
              //     sessionStorage.clear();
              //     this.router.navigate(['agent/login']);
              //   }
              // }
              // tslint:disable-next-line:triple-equals
            }
          }
        }));
  }
}
