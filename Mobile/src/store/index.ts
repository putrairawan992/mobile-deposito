import {configureStore} from '@reduxjs/toolkit';

import userReducer from './user';
import bankDataReducer from './bank';
import productReducer from './product';
import dashboardReducer from "./dashboard";
import portofolioReducer from "./portofolio";

const store = configureStore({
  reducer: {
    bankDataReducer,
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
