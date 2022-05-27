import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Member } from './member-details/member-details.component';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  api = 'http://localhost:8000/api';
  username: string = '';
  

  constructor(private http: HttpClient, public router: Router) { }

  // Returns all members
  public getMembers() {
    return this.http
      .get(`${this.api}/members`)
      .pipe(catchError(this.handleError));
  }
  
  public getMembersDetails(id:number) {
    return this.http.get(this.api + '/members/' + id)
    .pipe(catchError(this.handleError));
  }

  public getTeams():Observable<any> {
    return this.http
    .get(`${this.api}/teams`)
    .pipe(catchError(this.handleError));
  }

  public postMembers(data:any){
    return this.http.post(this.api + '/addMember',data)
    .pipe(catchError(this.handleError));
}

public deleteMember(id:number){
  return this.http.delete(this.api + '/members/' +  id )
  .pipe(catchError(this.handleError));
}

public updateMember(data:any){
  return this.http.put(this.api + '/members/' + data.id ,data )
  .pipe(catchError(this.handleError));
}

setUsername(name: string): void {
    this.username = name;
  }

public authenicateLogin(data:any) {
   return this.http.post<any>(this.api + '/login' , data)
   .pipe(catchError(this.handleError));
}

public getToken(){
  return localStorage.getItem('accessToken');
}

public logOutUser(){
  return localStorage.removeItem('accessToken');

}

private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    return [];
  }
}
