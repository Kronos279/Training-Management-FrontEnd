import { Component } from '@angular/core';

import { NgFor, NgIf } from '@angular/common';
import { WebcamModule } from 'ngx-webcam';
import { Subject } from 'rxjs';
import { WebcamImage } from 'ngx-webcam';
import { Router } from '@angular/router';

import { NgxPaginationModule } from 'ngx-pagination';
import { EmployeeService } from '../../employee.service';
import { AttendanceService } from '../../attendance.service';
import { Employee } from '../../types/Employee';
import { MatButtonModule } from '@angular/material/button';


@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [NgIf, WebcamModule, NgFor, NgxPaginationModule, MatButtonModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent {
  public showModal: boolean = false;
  private trigger: Subject<void> = new Subject<void>();
  public triggerObservable = this.trigger.asObservable();
  public webcamImage: WebcamImage | null = null;
  email!: string | null;
  employee?: Employee;
  markedAttendance!: any;
  public showMarkInModal: boolean = false;
  public showMarkOutModal: boolean = false;
  public allAttendance: any[] = [];
  p: number = 1;

  constructor(private router: Router, private empService: EmployeeService, private attendanceService: AttendanceService) {
    const navigation = this.router.getCurrentNavigation()
    if (navigation?.extras.state) {
      this.employee = navigation.extras.state["mentee"];
      if (this.employee)
        this.email = this.employee.employeeEmail;
    }
  }

  ngOnInit() {
    if (this.employee)
      this.getAllAttendance(this.employee.employeeId);
  }



  getAllAttendance(employeeId: string) {
    console.log("here in get all attendance");
    this.attendanceService.getAllAttendance(employeeId).subscribe(
      response => {
        this.allAttendance = response.reverse();
        console.log("All the attendance ", response);
      },
      error => {
        console.log("Couldn't retrieve the attendance ", error);
      }
    );
  }

  openMarkInModal() {
    this.showMarkInModal = true;
  }

  closeMarkInModal() {
    this.showMarkInModal = false;
  }

  openMarkOutModal() {
    this.showMarkOutModal = true;
  }

  closeMarkOutModal() {
    this.showMarkOutModal = false;
  }

  triggerSnapshot() {
    this.trigger.next();
  }

  handleMarkIn(webcamImage: WebcamImage) {
    console.log('Captured image:', webcamImage);
    this.webcamImage = webcamImage;
    const imageBlob = this.dataURItoBlob(webcamImage.imageAsDataUrl);
    if (this.employee) {
      const attendance: any = {
        employeeId: this.employee.employeeId,    //HardCoded
        date: new Date().toISOString().split('T')[0],
        inTime: this.getISTTime(),
        inPicture: imageBlob
      };

      console.log('Attendance object:', attendance);
      this.sendMarkIn(attendance);
      this.closeMarkInModal();
      this.ngOnInit();
    }
  }

  sendMarkIn(attendance: any) {
    this.attendanceService.markIn(attendance).subscribe(
      response => {
        this.markedAttendance = response;
        this.ngOnInit();
        console.log('Attendance marked: ', this.markedAttendance.attendance);
      },
      error => {
        alert("Attendance Not Marked in");
        console.log('Error marking attendance: ', error);
      }
    );
  }

  handleMarkOut(webcamImage: WebcamImage) {
    console.log('Captured image:', webcamImage);
    this.webcamImage = webcamImage;
    const imageBlob = this.dataURItoBlob(webcamImage.imageAsDataUrl);
    if(!this.employee){console.log("employee null"); return}
    const markAttendance: any = {
      employeeId: this.employee.employeeId,  //HardCoded
      date: new Date().toISOString().split('T')[0],
      outTime: this.getISTTime(),
      outPicture: imageBlob
    };
    console.log("Markout Object ", markAttendance);
    this.sendMarkOut(markAttendance);
    this.closeMarkOutModal();

  }

  sendMarkOut(markedAttendance: any) {
    this.attendanceService.markOut(markedAttendance).subscribe(
      response => {
        this.ngOnInit();
        console.log("marked out successfully ", response);
      },
      error => {
        alert("Attendance is not marked out");
        console.log("Not marked out!", error);
      }
    );
  }

  dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  }
  getISTDate() {
    const now = new Date();
    const utcOffset = now.getTimezoneOffset() * 60000;
    const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC +5:30
    const istTime = new Date(now.getTime() + utcOffset + istOffset);
    return istTime.toISOString(); // Returns the date in ISO format
  }

  getISTTime() {
    const istDate = new Date(this.getISTDate());
    return istDate.toTimeString().split(' ')[0];
  }

}
