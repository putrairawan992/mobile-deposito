import {configureStore} from '@reduxjs/toolkit';

import userReducer from './user';
import productReducer from './product';
import dashboardReducer from "./dashboard";
import portofolioReducer from "./portofolio";

const store = configureStore({
  reducer: {
    portofolioReducer,
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
