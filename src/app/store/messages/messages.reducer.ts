import { Action, createReducer, on } from '@ngrx/store';
import { IMessage } from 'src/app/messages/models/message';
import { messagesActions } from '.';

export interface IMessagesState {
  isLoading: boolean;
  messages: IMessage[];
}

export const initialState: IMessagesState = {
  isLoading: false,
  messages: [],
};

export function messagesReducer(
  state: IMessagesState | undefined,
  action: Action
): IMessagesState {
  return reducer(state, action);
}

const reducer = createReducer<IMessagesState>(
  initialState,

  on(messagesActions.GetMessages, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(messagesActions.GetMessagesSuccess, (state, { messages }) => ({
    ...state,
    messages,
    isLoading: false,
  })),

  on(messagesActions.GetMessagesFailure, (state) => ({
    ...state,
    isLoading: false,
  })),

  on(messagesActions.CreateMessage, (state) => ({
    ...state,
    isLoading: true,
  })),

  on(messagesActions.CreateMessageSuccess, (state, { messages }) => ({
    ...state,
    messages,
    isLoading: false,
  })),

  on(messagesActions.CreateMessageFailure, (state) => ({
    ...state,
    isLoading: false,
  }))
);
