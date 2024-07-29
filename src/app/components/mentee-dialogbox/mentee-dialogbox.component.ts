import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Employee } from '../../types/Employee';
import { EmployeeServiceService } from '../../employee-service.service';
import { DailyUpdateServiceService } from '../../daily-update-service.service';
import { DailyUpdate } from '../../types/DailyUpdate';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { faBirthdayCake, faCalendar, faEnvelope, faGraduationCap, faUsers, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ViewChild, ElementRef } from '@angular/core';
import Chart, { ChartConfiguration } from 'chart.js/auto';


@Component({
  selector: 'app-mentee-dialogbox',
  standalone: true,
  imports: [NgIf,NgFor,FontAwesomeModule,DatePipe,MatIcon,MatButtonModule],
  templateUrl: './mentee-dialogbox.component.html',
  styleUrl: './mentee-dialogbox.component.scss'
})
export class MenteeDialogboxComponent {

  faGraduationCap =faGraduationCap;
  faEnvelope = faEnvelope;
  faVenusMars=faVenusMars;
  faBirthdayCake=faBirthdayCake;
  faCalendar=faCalendar;
  faUsers=faUsers;

  mentee?:Employee;
  dailyUpdates:DailyUpdate[]=[];
  lables:string[]=[];
  completionStatus:number[]=[];

  constructor(private dialogRef: MatDialogRef<MenteeDialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private menteeService:EmployeeServiceService,private dailyupdateService:DailyUpdateServiceService){
      this.mentee = this.data.data;
      this.loadDailyupdates();
  }

  ngOnInit(){
    if(this.mentee){
      for(const course of this.mentee.course){
        this.lables.push(course.courseName);
        let count=0;
        let size = course.subCourses.length;
        for(const subCourse of course.subCourses){
          if(subCourse.status == "Complete"){
            count++;
          }
        }
        this.completionStatus.push((count/size)*100);

      }
    }

  }


  loadDailyupdates(){
    this.dailyupdateService.getDailUpdateByEmployeeId("46353246").subscribe(res=>{
      this.dailyUpdates=res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    })
  }

  close(){
    this.dialogRef.close();
  }


  @ViewChild('doughnutChart') private doughnutChartRef!: ElementRef<HTMLCanvasElement>;
  private doughnutChart?: Chart<'doughnut', number[], unknown>;

  ngAfterViewInit(): void {
    this.createDoughnutChart();
  }

  createDoughnutChart(): void {
    const data = {
      labels: this.lables,
      datasets: [{
        label: 'Completed %',
        data: this.completionStatus,
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4
      }]
    };

    const config: ChartConfiguration<'doughnut'> = {
      type: 'doughnut',
      data: data,
      options: {
        responsive: true,
        plugins: {
          tooltip: {
            enabled: true,
          },
          legend: {
            position: 'top',
          }
        }
      }
    };

    const ctx = this.doughnutChartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.doughnutChart = new Chart<'doughnut', number[], unknown>(ctx, config);
    }
  }






}
