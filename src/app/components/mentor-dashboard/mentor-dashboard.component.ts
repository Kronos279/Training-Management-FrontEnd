import { Component } from '@angular/core';
import { NavbarComponent } from "../navbar/navbar.component";
import { MentorService } from '../../mentor.service';
import { Mentor } from '../../types/Mentor';
import { DatePipe, JsonPipe } from '@angular/common';
import { Batch } from '../../types/Batch';
import { Router } from '@angular/router';
import { BatchServiceService } from '../../batch-service.service';


@Component({
  selector: 'app-mentor-dashboard',
  standalone: true,
  templateUrl: './mentor-dashboard.component.html',
  styleUrl: './mentor-dashboard.component.scss',
  imports: [ NavbarComponent, JsonPipe, DatePipe]
})
export class MentorDashboardComponent {

  constructor(private mentorService: MentorService, private router: Router,
    private batchService: BatchServiceService) {

  }

  mentor: Mentor | undefined;
  batch: Batch[] = [];
  activeBatch: number = 0;
  totalMentees: number = 0;


  ngOnInit() {
    this.mentorService.getMentorById("4431345").subscribe(res => {
      this.mentor = res;
      // console.log("mentor service", res);

      if (!this.mentor) { return; }
      for (const batchId of this.mentor.batches) {
        this.batchService.getBatchByBatchId(batchId).subscribe(res => {
          // console.log("In Get Batch", res);
          this.totalMentees += res.menteeIds.length;
          if (res.status === "Active") {
            this.activeBatch += 1;
          }
          this.batch.push(res);
        });
      }
    });
  }


  OnClick(batchId: string) {
    this.router.navigate(["batchdetails"], { state: { "batch": batchId } });
  }
}





