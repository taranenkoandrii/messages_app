import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, of, switchMap } from 'rxjs';

import { MessageService } from 'src/app/messages/services/message.service';
import { messagesActions } from 'src/app/store/messages';

@Injectable()
export class MessagesEffects {
  constructor(
    private actions$: Actions,
    private messageService: MessageService
  ) {}

  getMessages$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(messagesActions.GetMessages),
      switchMap(() =>
        this.messageService.getAll().pipe(
          map((changes) => {
            const messages = changes.map((c) => ({
              id: c.payload.doc.id,
              ...c.payload.doc.data(),
            }));
            return messagesActions.GetMessagesSuccess({ messages });
          }),
          catchError(() => of(messagesActions.GetMessagesFailure()))
        )
      )
    );
  });

  createMessage$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(messagesActions.CreateMessage),
      switchMap(({ message }) =>
        this.messageService.create(message).pipe(
          map((changes) => {
            const messages = changes.map((c) => ({
              id: c.payload.doc.id,
              ...c.payload.doc.data(),
            }));
            return messagesActions.CreateMessageSuccess({ messages });
          }),
          catchError(() => of(messagesActions.CreateMessageFailure()))
        )
      )
    );
  });
}
