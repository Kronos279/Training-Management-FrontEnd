import { Component, TemplateRef } from '@angular/core';
import { EmployeeServiceService } from '../../employee-service.service';
import { Employee } from '../../types/Employee';
import { JsonPipe, NgFor, NgIf } from '@angular/common';
import { SubCourse } from '../../types/SubCourse';
import { Course } from '../../types/Course';
import { DailyUpdateServiceService } from '../../daily-update-service.service';
import { DailyUpdate } from '../../types/DailyUpdate';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBirthdayCake, faCalendar, faEnvelope, faGraduationCap, faUsers, faVenusMars } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { SubcoursesDialogComponent } from '../subcourses-dialog/subcourses-dialog.component';
import { Router } from '@angular/router';
import { state } from '@angular/animations';
import { MatButtonModule } from '@angular/material/button';
import { GeminiChatService } from '../../gemini-chat.service';


@Component({
  selector: 'app-mentee-dashboard',
  standalone: true,
  imports: [JsonPipe, FormsModule, NgFor, NgIf, FontAwesomeModule, MatButtonModule],
  templateUrl: './mentee-dashboard.component.html',
  styleUrl: './mentee-dashboard.component.scss'
})
export class MenteeDashboardComponent {
  faGraduationCap = faGraduationCap;
  faEnvelope = faEnvelope;
  faVenusMars = faVenusMars;
  faBirthdayCake = faBirthdayCake;
  faCalendar = faCalendar;
  faUsers = faUsers;
  constructor(private chatService: GeminiChatService, private menteeService: EmployeeServiceService, private dailyupdateService: DailyUpdateServiceService, public dialog: MatDialog,
    private router: Router
  ) {
  }

  mentee?: Employee;
  courses: Course[] = [];
  dailyUpdates: DailyUpdate[] = [];
  newUpdateText?: string;
  coursesCompletion: { [courseId: string]: number } = {}; //The Number represents the total no of subcourses complete
  courseOpenState: { [courseId: string]: boolean } = {};
  selectedCourse?: Course;

  userPrompt?: string;
  responseContent?: string;
  errorMessage: string = '';

  ngOnInit() {
    this.menteeService.getEmployeeByEmployeeId("46353246").subscribe(res => {
      this.mentee = res
    })
    if (!this.mentee) { return }
    for (const course of this.mentee?.course) {
      this.courses.push(course);
      let completedSubCourse = 0;
      for (const subcourse of course.subCourses) {
        if (subcourse.status === 'Complete') {
          completedSubCourse += 1;
        }
      }
      this.coursesCompletion[course.courseId] = completedSubCourse;
    }

    this.loadDailyupdates();
  }

  toggleCourse(courseId: string): void {
    if (this.courseOpenState[courseId]) {
      this.courseOpenState[courseId] = false;
      console.log(false);
    }
    else {
      console.log(true);
      this.courseOpenState[courseId] = true;
    }

  }

  askChatbot() {
    console.log("Ask Button clicked");
    if (this.userPrompt) {
      this.chatService.getChatResposne(this.userPrompt).subscribe(
        data => {
          const candidates = data.candidates;
          if (candidates && candidates.length > 0) {
            this.responseContent = candidates[0].content.parts[0].text;
            console.log(this.responseContent)
          } else {
            this.errorMessage = 'No response received';
          }
        },
        error => {
          this.errorMessage = 'Error fetching response: ' + error.message;
        }
      )
    }
  }

  loadDailyupdates() {
    this.dailyupdateService.getDailUpdateByEmployeeId("46353246").subscribe(res => {
      this.dailyUpdates = res.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      console.log(this.dailyUpdates);
    })
  }


  addUpdate() {
    console.log("add Update triggred")
    if (this.newUpdateText) {
      this.dailyupdateService.addDailyUpdate("46353246", this.newUpdateText).subscribe(res => {
        console.log(res)
        this.loadDailyupdates();
      });
    }
  }
  trackByIndex(index: number, item: any): number {
    return index;
  }

  openDialog(course: Course) {
    this.selectedCourse = course;
    const dialogRef = this.dialog.open(SubcoursesDialogComponent, {
      width: '80%', // Set the width of the dialog
      height: "80%",
      data: { data: this.selectedCourse, menteeId: this.mentee?.employeeId }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }


  getCompletionColor(course: Course): string {
    if (!course.subCourses || course.subCourses.length === 0) {
      return '#f9f9f9'; // Default background if there are no sub-courses
    }

    const completedSubCourses = course.subCourses.filter(subCourse => subCourse.status === 'Complete').length;
    const totalSubCourses = course.subCourses.length;
    const completionPercentage = (completedSubCourses / totalSubCourses) * 100;

    return `linear-gradient(90deg, #90EE90 ${completionPercentage}%, #f9f9f9 ${completionPercentage}%)`;
  }


  trackByCourseId(index: number, course: Course): string {
    return course.courseId;
  }


  markAttendance() {
    if (this.mentee) {
      this.router.navigate(['/attendance'], { state: { mentee: this.mentee } })
    }
  }




}
