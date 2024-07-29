import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private httpClient:HttpClient) { }

  getEmployeeByEmail(email:string){
    let params=new HttpParams()
    .set("email",email);
    return this.httpClient.get<any>("http://localhost:8081/emp/email",{params:params});
  }
}
