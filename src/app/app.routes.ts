import { Routes } from '@angular/router';
import { MentorDashboardComponent } from './components/mentor-dashboard/mentor-dashboard.component';
import { MenteeComponent } from './components/mentee/mentee.component';
import { BatchDetailsComponent } from './components/batch-details/batch-details.component';
import { MenteeDashboardComponent } from './components/mentee-dashboard/mentee-dashboard.component';
import { MenteeprofileChartComponent } from './components/menteeprofile-chart/menteeprofile-chart.component';
import { AttendanceComponent } from './components/attendance/attendance.component';
import { authGuard } from './AuthGuard/auth.guard';
import { SignupComponent } from './components/signup/signup.component';
import { UnAuthorisedComponent } from './components/un-authorised/un-authorised.component';

export const routes: Routes = [
  {
    path:"",
    component:MentorDashboardComponent,
    canActivate:[authGuard],
    data:{expectedRoles:["ROLE_ADMIN"]}
  },
  {
    path:"mentee",
    component:MenteeComponent
  },
  {
    path:"batchdetails",
    component:BatchDetailsComponent,
    canActivate:[authGuard],
    data:{expectedRoles:["ROLE_ADMIN"]}
  },
  {
    path:"menteedashboard",
    component:MenteeDashboardComponent,
    canActivate:[authGuard],
    data:{expectedRoles:["ROLE_ADMIN","ROLE_USER"]}
  },
  {
    path:"mentee",
    component:MenteeComponent
  },
  {
    path:"tempchart",
    component:MenteeprofileChartComponent,
    canActivate:[authGuard],
    data:{expectedRoles:["ROLE_ADMIN"]}
  },
  {
    path:"attendance",
    component:AttendanceComponent
  },
  {
    path:"login",
    component:SignupComponent
  },
  {
    path:"Unauthorised",
    component:UnAuthorisedComponent
  },
  {
    path:"logout",
    component:SignupComponent
  }
];
