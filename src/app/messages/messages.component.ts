import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { take } from 'rxjs';
import { messagesActions, messagesSelectors } from '../store/messages';
import { IMessagesState } from '../store/messages/messages.reducer';
import { MessagesDialogComponent } from './messages-dialog/messages-dialog.component';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent {
  constructor(
    public dialog: MatDialog,
    private messageStore: Store<IMessagesState>
  ) {}

  ngOnInit(): void {
    this.messageStore.dispatch(messagesActions.GetMessages());
    this.messageStore
      .select(messagesSelectors.selectMessages)
      .pipe(take(1))
      .subscribe();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MessagesDialogComponent, {});

    dialogRef.afterClosed().subscribe((result) => {
      this.messageStore.dispatch(
        messagesActions.CreateMessage({ message: result })
      );

      this.messageStore
        .select(messagesSelectors.selectMessages)
        .pipe(take(1))
        .subscribe();
    });
  }
}
