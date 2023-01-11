import { createAction, props } from '@ngrx/store';

import { IMessage } from 'src/app/messages/models/message';

export const GetMessages = createAction('[Messages] Get Messages List');
export const GetMessagesSuccess = createAction(
  '[Messages] Get Messages List Success',
  props<{ messages: IMessage[] }>()
);
export const GetMessagesFailure = createAction(
  '[Messages] Get Messages List Failure'
);

export const CreateMessage = createAction(
  '[Messages] Create Message',
  props<{ message: IMessage }>()
);
export const CreateMessageSuccess = createAction(
  '[Messages] Create Message Success',
  props<{ messages: IMessage[] }>()
);
export const CreateMessageFailure = createAction(
  '[Messages] Create Message Failure'
);
