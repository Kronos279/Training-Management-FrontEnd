import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../types/Course';
import { SubCourse } from '../../types/SubCourse';
import { MatIcon } from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { NgFor, NgIf } from '@angular/common';
import { EmployeeServiceService } from '../../employee-service.service';
import { Employee } from '../../types/Employee';



@Component({
  selector: 'app-subcourses-dialog',
  standalone: true,
  imports: [MatIcon,MatDialogClose,MatButtonModule,NgIf,NgFor],
  templateUrl: './subcourses-dialog.component.html',
  styleUrl: './subcourses-dialog.component.scss'
})
export class SubcoursesDialogComponent {

  constructor(private dialogRef: MatDialogRef<SubcoursesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,private menteeservice: EmployeeServiceService) {
      this.course = this.data.data;
      this.mentee = this.data.menteeId;
    }

    mentee?:Employee;
    course?:Course;

    close(): void {
      this.dialogRef.close();
    }

    toggleSubCourseStatus(subCourse: SubCourse): void {
      if(!this.mentee || !this.course){ return}
      const statuses = [ 'In Progress', 'Complete','Incomplete'];
      const currentIndex = statuses.indexOf(subCourse.status);
      subCourse.status = statuses[(currentIndex + 1) % statuses.length];
      this.changeStatusOfSubCourse(this.mentee?.employeeId, this.course?.courseId, subCourse);
    }

    getSubCourseStatus(status: string ): string {
      switch (status) {
        case 'Complete':
          return 'Mark as Incomplete';
        case 'In Progress':
          return 'Mark as Complete';
        default:
          return 'Mark as In Progress';
      }


    }

    changeStatusOfSubCourse(menteeId:string,courseId:string,subcourse:SubCourse){
      console.log("Button pressed")
      this.menteeservice.changeSubCourseStatus(menteeId,courseId,subcourse).subscribe(res=>{
        console.log(res);
      })
    }
}
