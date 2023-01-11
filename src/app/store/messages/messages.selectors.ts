import { createSelector } from '@ngrx/store';

export const selectMessagesState = (state: any) => state;

export const selectMessages = createSelector(
  selectMessagesState,
  (state) => state.messages.messages
);
