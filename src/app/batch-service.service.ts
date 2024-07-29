import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Batch } from './types/Batch';
import { Announcement } from './types/Announcements';

@Injectable({
  providedIn: 'root'
})
export class BatchServiceService {

  constructor(private httpClient:HttpClient) { }

  getBatchsByMentorId(mentorId:string){
    return this.httpClient.get<Batch[]>("http://localhost:8888/mentors/mentorById?mentoremployeeId="+mentorId);
  }

  getBatchByBatchId(batchId:string){
    return this.httpClient.get<Batch>("http://localhost:8888/batch/"+batchId);
  }


  getAnnouncements(batchId:string){
    return this.httpClient.get<Announcement[]>("http://localhost:8888/batch/announcement?batchId="+batchId)
  }

  addAnnouncement(batchId:string,announcement:string){
    return this.httpClient.post<Announcement[]>("http://localhost:8888/batch/announcement/"+batchId,announcement);
  }
}
