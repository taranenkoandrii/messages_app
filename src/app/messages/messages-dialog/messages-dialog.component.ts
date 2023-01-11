import { Component, Inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IMessage } from '../models/message';

@Component({
  selector: 'app-messages-dialog',
  templateUrl: './messages-dialog.component.html',
  styleUrls: ['./messages-dialog.component.scss'],
})
export class MessagesDialogComponent {
  form = this.fb.group({
    name: [''],
    message: [''],
  });

  constructor(
    public dialogRef: MatDialogRef<MessagesDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IMessage,
    private fb: FormBuilder
  ) {}

  onCrossClick(): void {
    this.dialogRef.close();
  }

  closeDialog(): void {
    this.dialogRef.close(this.form.value);
  }
}
