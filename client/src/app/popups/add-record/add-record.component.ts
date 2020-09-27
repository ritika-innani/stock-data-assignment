import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-record',
  templateUrl: './add-record.component.html'
})
export class AddRecordComponent implements OnInit {
  data = {
    Open: 0,
    Close: 0
  };

  constructor(
    public dialogRef: MatDialogRef<AddRecordComponent>
  ) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
