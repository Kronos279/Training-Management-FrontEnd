import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Mentor } from './types/Mentor';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MentorService {

  constructor(private httpClient:HttpClient) { }

  public apiData$?: Observable<Mentor>;

  getAllMentors(){
    this.httpClient.get<Mentor[]>("http://localhost:8888/mentors");
  }

  getMentorById(mentorId:string){
    this.apiData$ = this.httpClient.get<Mentor>("http://localhost:8888/mentors/mentorById?mentoremployeeId="+mentorId);
    return this.apiData$;
  }

}
