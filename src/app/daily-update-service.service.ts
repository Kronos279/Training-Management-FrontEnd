import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DailyUpdate } from './types/DailyUpdate';


@Injectable({
  providedIn: 'root'
})
export class DailyUpdateServiceService {

  constructor(private httpClient: HttpClient) { }


  getDailUpdateByEmployeeId(employeeId:string){
    return this.httpClient.get<DailyUpdate[]>("http://localhost:8085/dailyupdates/"+employeeId);
  }


  getDailyUpdateByEmployeeIdandDate(employeeId:string, date:Date){
    return this.httpClient.get<DailyUpdate[]>("http://localhost:8085/dailyupdates/"+employeeId+"/"+date);
  }

  addDailyUpdate(employleeId:String, updateText:string){
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'
    });
    return this.httpClient.post<string>("http://localhost:8085/dailyupdates/"+employleeId,updateText,{headers});
  }
}


