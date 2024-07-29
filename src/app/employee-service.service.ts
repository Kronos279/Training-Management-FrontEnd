import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Employee } from './types/Employee';
import { blob } from 'stream/consumers';
import { Observable } from 'rxjs';
import { SubCourse } from './types/SubCourse';

@Injectable({
  providedIn: 'root'
})
export class EmployeeServiceService {


  httpClient = inject(HttpClient)
  constructor() { }

  getEmployeeByBatchId(batchId:string){
    return this.httpClient.get<Employee[]>("http://localhost:8081/employeedetails/batch/"+batchId);
  }

  getEmployeePhoto(employeeId:string):Observable<Blob>{
    const params = new HttpParams().set('employeeId', employeeId);
    return this.httpClient.get(`http://localhost:8081/employeedetails/getImage`, {
      params: params,
      responseType: 'blob'
    });
  }


  getEmployeeByEmployeeId(employeeId:string){
    return this.httpClient.get<Employee>("http://localhost:8888/employeedetails/getEmployeeById?employeeId="+employeeId);
  }


  getCourseCompletionPercentage(batchId:string){
    return this.httpClient.get<any>("http://localhost:8888/employeedetails/calculateTotalCompletionStatus?batchId="+batchId);
  }

  changeSubCourseStatus(employeeId:string, courseId:string,subcourse:SubCourse){
    return this.httpClient.put(`http://localhost:8081/employeedetails/courses/subcourses?employeeId=${employeeId}&courseId=${courseId}`,subcourse);
  }

}
