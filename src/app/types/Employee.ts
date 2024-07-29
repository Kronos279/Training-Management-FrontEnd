import { Course } from "./Course";
export interface Employee{
  employeeId:string,
  employeeEmail:string,
  employeeFirstName:string,
  employeeLastName:string,
  employeeGrade:string,
  employeeGender:string,
  employeeBirthDate:Date,
  employeeJoiningDate:Date,
  batchId:string,
  course:Course[],
  image:any
}
