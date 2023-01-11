import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessagesDialogComponent } from './messages-dialog/messages-dialog.component';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(): void {
    const dialogRef = this.dialog.open(MessagesDialogComponent, {});
  }
}
