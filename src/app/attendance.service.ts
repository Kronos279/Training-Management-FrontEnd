import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {

  constructor(private httpClient:HttpClient) { }

  markIn(attendance:any){
    const formData: FormData = new FormData();
    formData.append('markin', attendance.inTime);
    formData.append('employeeId', attendance.employeeId);
    formData.append('date', attendance.date);
    formData.append('image', attendance.inPicture, 'inPicture.jpg');

    return this.httpClient.post<any>(`http://localhost:8080/attendance/markin`, formData);
  }

  markOut(attendance:any){
    const formData: FormData=new FormData();
    formData.append('markout',attendance.outTime);
    formData.append("image",attendance.outPicture);
    formData.append("employeeId",attendance.employeeId);
    formData.append("date",attendance.date);

    return this.httpClient.patch<any>('http://localhost:8080/attendance/markout',formData);
  }

  getAllAttendance(employeeId:string){
    const params = new HttpParams().set('employeeId', employeeId);
    return this.httpClient.get<any[]>('http://localhost:8080/attendance/getByEmployeeId', { params });
  }
}
