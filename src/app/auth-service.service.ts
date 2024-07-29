import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable, Subject, tap } from 'rxjs';
import { Jwtheader } from './types/JwtHeader';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  loggegIn = new Subject<any>();
  loggedIn$ = this.loggegIn.asObservable();

  setLoggedIn(data:any){
    this.loggegIn.next(data);
  }

  private ApiUrl ="http://localhost:8889/auth/token";
  private httpClient = inject(HttpClient);
  constructor() { }


  Login(credentials: { employeeId: string, password: string }): Observable<any>{
    console.log("authService called")
    return this.httpClient.post(`${this.ApiUrl}`,credentials,{responseType:'text'}).pipe(
      tap(response=>{
        if(response){
          localStorage.setItem('token',response);
          this.setLoggedIn(true);
        }
      })
    );
  }

  Logout(){
    localStorage.removeItem("token");
    this.setLoggedIn(false);
  }

  getToken(): string | null {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem('token');
    } else {
      return null;
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }


  getRole(){
    let token = this.getToken();
    let role!:string;
    if(token){
    const header = jwtDecode<Jwtheader>(token,{header:true});
    role = header.role;
    }
    return role;

  }


}



