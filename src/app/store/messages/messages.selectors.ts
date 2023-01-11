import { createSelector } from '@ngrx/store';

export const selectMessagesState = (state: any) => state;

export const selectMessages = createSelector(
  selectMessagesState,
  (state) => state.messages.messages
);

export const isLoading = createSelector(
  selectMessagesState,
  (state) => state.messages.isLoading
);

export const selectError = createSelector(
  selectMessagesState,
  (state) => state.messages.error
);
