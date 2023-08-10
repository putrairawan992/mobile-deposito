import store from '../store';

export const API =
  'https://dev.depositosyariah.id/api';

export const defaultHeaderAxios = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${store.getState().userReducer.token}`,
  },
};
