import { Component, ElementRef, ViewChild } from '@angular/core';
import { Batch } from '../../types/Batch';
import { Router } from '@angular/router';
import { BatchServiceService } from '../../batch-service.service';
import { Course } from '../../types/Course';
import { Employee } from '../../types/Employee';
import { EmployeeServiceService } from '../../employee-service.service';
import { DoughnutChartComponent } from "../doughnut-chart/doughnut-chart.component";
import { NgFor, NgIf } from '@angular/common';
import { TaskflowChartComponent } from '../taskflow-chart/taskflow-chart.component';
import { Announcement } from '../../types/Announcements';
import { MenteeComponent } from '../mentee/mentee.component';
import { MatDialog } from '@angular/material/dialog';
import { ChartOptions,ChartType } from 'chart.js';
import Chart from 'chart.js/auto';
import { MenteeDialogboxComponent } from '../mentee-dialogbox/mentee-dialogbox.component';
import { AddAnnouncementComponent } from '../add-announcement/add-announcement.component';



@Component({
    selector: 'app-batch-details',
    standalone: true,
    templateUrl: './batch-details.component.html',
    styleUrl: './batch-details.component.scss',
    imports: [DoughnutChartComponent,NgFor,NgIf,TaskflowChartComponent,MenteeComponent]
})
export class BatchDetailsComponent {

  batchid?: string;
  batch?:Batch;
  Courses:Course[]=[];
  lables:string[]=[];
  completionNumber:number[]=[];
  mentees:Employee[]=[];

  announcements:Announcement[]=[];



  constructor(private router:Router,private batchService: BatchServiceService,private employeeService:EmployeeServiceService,public dialog: MatDialog){
   const navigation=router.getCurrentNavigation();
   if(navigation?.extras.state){
    this.batchid=navigation?.extras.state["batch"];
   }
  }

  ngOnInit(){
    if(!this.batchid){return}
      this.batchService.getBatchByBatchId(this.batchid).subscribe(res=>{this.batch=res});
      this.getAnnouncement();
      this.employeeService.getEmployeeByBatchId(this.batchid).subscribe(res=>{this.mentees=res});

      const firstMentee = this.mentees[0];
      for(const course of firstMentee.course){
        this.Courses.push(course);
      }
  }


  getAnnouncement(){
    if(!this.batchid){return}
    this.batchService.getAnnouncements(this.batchid).subscribe(res=>{
      this.announcements=res;
    })
  }
  viewParticipants():void{
    this.router.navigate(['/mentee'], {state:{batchId:this.batchid}});
  }

  addAnnouncement(){
    const dialogRef = this.dialog.open(AddAnnouncementComponent,{
      width: '50%',
      height:'60%',
      data:{data:this.batchid}
    });
    dialogRef.afterClosed().subscribe(res=>{
      this.getAnnouncement();
    })
  }
}
