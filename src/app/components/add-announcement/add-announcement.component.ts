import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { BatchServiceService } from '../../batch-service.service';

@Component({
  selector: 'app-add-announcement',
  standalone: true,
  imports: [MatIcon,FormsModule,MatFormField,MatLabel,MatButton],
  templateUrl: './add-announcement.component.html',
  styleUrl: './add-announcement.component.scss'
})
export class AddAnnouncementComponent {

  constructor(private dialogRef: MatDialogRef<AddAnnouncementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any, private batchservice: BatchServiceService){
      this.batchid = this.data.data;
  }

  batchid?:string;

  announcementText?:string;

  submit(){
    if(this.batchid && this.announcementText){
      console.log("hello")
    this.batchservice.addAnnouncement(this.batchid, this.announcementText).subscribe(res=>{
      console.log(res);
      this.closeDialog();
    });
    }
  }

  closeDialog(){
    this.dialogRef.close();
  }
}
