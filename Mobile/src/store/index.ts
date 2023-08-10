import {configureStore} from '@reduxjs/toolkit';

import userReducer from './user';

const store = configureStore({
  reducer: {
    userReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;
