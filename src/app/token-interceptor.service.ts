import { Injectable } from '@angular/core';
import {  HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const idToken = localStorage.getItem('accessToken');
    let tokenizedReq = req.clone({
      setHeaders: {
      Authorization : 'Beared ' + idToken
      }
    })
    return next.handle(tokenizedReq)
  }
}
