import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { Observable, Subscription, switchMap, take } from 'rxjs';

import { messagesActions, messagesSelectors } from '../store/messages';
import { IMessagesState } from '../store/messages/messages.reducer';
import { MessagesDialogComponent } from './messages-dialog/messages-dialog.component';
import { IMessage } from './models/message';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss'],
})
export class MessagesComponent implements OnDestroy {
  private subscriptions: Subscription[] = [];

  constructor(
    public dialog: MatDialog,
    private messageStore: Store<IMessagesState>,
    private _snackBar: MatSnackBar
  ) {}

  displayedColumns: string[] = ['id', 'name', 'message', 'date'];
  messages$!: Observable<IMessage[]>;
  isLoading$ = this.messageStore.select(messagesSelectors.isLoading);

  ngOnInit(): void {
    this.messageStore.dispatch(messagesActions.GetMessages());
    this.messages$ = this.messageStore.select(messagesSelectors.selectMessages);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MessagesDialogComponent, {});

    const sub = dialogRef
      .afterClosed()
      .pipe(
        switchMap((dialogData: IMessage) => {
          this.messageStore.dispatch(
            messagesActions.CreateMessage({
              message: { ...dialogData, date: +new Date() },
            })
          );
          return this.messageStore.select(messagesSelectors.selectError);
        })
      )
      .subscribe((error) => {
        const status = error ? error : 'Success';
        this._snackBar.open(status, '', {
          duration: 2000,
        });
      });
    this.subscriptions.push(sub);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe;
    });
  }
}
