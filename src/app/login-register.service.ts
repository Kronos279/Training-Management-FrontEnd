import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginRegisterService {

  constructor(private httpClient: HttpClient) { }

  registerUser(credentials:any){

    return this.httpClient.post(`http://localhost:8889/auth/register`,credentials,{responseType:'text'});

  }


}
