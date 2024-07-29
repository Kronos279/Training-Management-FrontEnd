import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { Employee } from '../../types/Employee';
import { EmployeeServiceService } from '../../employee-service.service';
import { error } from 'console';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Course } from '../../types/Course';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenteeDialogboxComponent } from '../mentee-dialogbox/mentee-dialogbox.component';


@Component({
  selector: 'app-mentee',
  standalone: true,
  imports: [DatePipe, MatInputModule,MatFormFieldModule,MatIconModule,NgFor,NgIf,FormsModule],
  templateUrl: './mentee.component.html',
  styleUrl: './mentee.component.scss'
})
export class MenteeComponent {

  batchId?:String;
  employees: Employee[] = [];
  courses:Course[]=[];
  searchTerm: string = '';
  filteredEmployees: Employee[] =[];
  employeePhotos: { [key: string]: string } = {};

  constructor(private router:Router, private employeeService: EmployeeServiceService,public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getEmployeesByBatch();
    for(const employee of this.employees){
      this.loadEmployeePhotos(employee);
      this.courses=employee.course;
    }
}



filterEmployees(): void {
  const term = this.searchTerm.toLowerCase();
  this.filteredEmployees = this.employees.filter(employee =>
    employee.employeeFirstName.toLowerCase().includes(term) ||
    employee.employeeLastName.toLowerCase().includes(term) ||
    employee.employeeId.toLowerCase().includes(term) ||
    employee.employeeEmail.toLowerCase().includes(term)
  );
}


  getEmployeesByBatch(): void {
    this.employeeService.getEmployeeByBatchId('BULT-01').subscribe(
      (res: Employee[]) => {
        this.employees = res;
        this.filteredEmployees=this.employees;
      },
      (error) => {
        console.error('Error fetching employees', error);
      }
    );
  }

  loadEmployeePhotos(employee:Employee): void {

      this.employeeService.getEmployeePhoto(employee.employeeId).subscribe(
        (photo: Blob) => {
          const reader = new FileReader();
          reader.onload = () => {
            console.log(`Image for employee ${employee.employeeId} loaded successfully`);
            this.employeePhotos[employee.employeeId] = reader.result as string;
            console.log(this.employeePhotos);
          };
          reader.onerror = (error) => {
            console.error(`Error reading image for employee ${employee.employeeId}`, error);
          };
          reader.readAsDataURL(photo);
        },
        (error) => {
          console.error(`Error fetching photo for employee ${employee.employeeId}`, error);
        }
      );
  }


  openDialog(selectedmentee:Employee){

    const dialogRef = this.dialog.open(MenteeDialogboxComponent,{
      width: '90%',
      height:'95%',
      data: {data : selectedmentee}
    });
    dialogRef.afterClosed().subscribe(res=>{
      console.log("Mentee Dialog was closed");
    })
  }

}
