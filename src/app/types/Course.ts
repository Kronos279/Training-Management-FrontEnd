import { SubCourse } from "./SubCourse";

export interface Course{
  courseId:string,
  courseName:string,
  subCourses:SubCourse[]
}
