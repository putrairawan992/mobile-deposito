import {configureStore} from '@reduxjs/toolkit';

import userReducer from './user';
import productReducer from './product';
import dashboardReducer from "./dashboard";

const store = configureStore({
  reducer: {
    userReducer,
    productReducer,
    dashboardReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

export default store;
