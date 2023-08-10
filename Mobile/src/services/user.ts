import axios from 'axios';
import store, { RootDispatch } from '../store';
import { API, defaultHeaderAxios } from '../utils/constant';
import {
  setLoginLoading,
  setRegisterLoading,
  setToken,
  setUser,
} from '../store/user';
import Toast from 'react-native-toast-message';
import { addStorage, removeStorage } from '../utils/storage';
import { navigationRef, replace } from '../navigation/RootNavigation';

export const checkLogin =
  (emailOrPhone: string) =>
    async (dispatch: RootDispatch) => {
      dispatch(setLoginLoading(true));
      axios
        .post(`${API}/ceklogin`, { username: emailOrPhone }, defaultHeaderAxios)
        .then(res => {
          navigationRef.navigate('OTP', {
            emailOrPhone,
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        })
        .finally(() => dispatch(setLoginLoading(false)));
    };

export const login =
  (emailOrPhone: string, password: string) =>
    async (dispatch: RootDispatch) => {
      dispatch(setLoginLoading(true));
      axios
        .post(`${API}/login`, { username: emailOrPhone, password: password }, defaultHeaderAxios)
        .then(res => {
          setUser(res?.data)
          addStorage('token', res.data.token);
          navigationRef.navigate('SplashLogin');
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        })
        .finally(() => dispatch(setLoginLoading(false)));
    };

export const getCurrentUser = () => async (dispatch: RootDispatch) => {
  const token = store.getState().userReducer.token;

  axios
    .get(`${API}/account/profile`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(res => dispatch(setUser(res.data.data)))
    .catch(err => console.log('err get current user: ', err.response));
};

export const logout = () => async (dispatch: RootDispatch) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  removeStorage('token');
  navigationRef.reset({ index: 0, routes: [{ name: 'Login' }] });
};

export const register =
  (
    fullname: string,
    phone: string,
    password: string,
    password_confirm: string,
  ) =>
    async (dispatch: RootDispatch) => {
      dispatch(setRegisterLoading(true));

      axios
        .post(
          `${API}/register`,
          { fullname, phone, password, password_confirm },
          defaultHeaderAxios,
        )
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: 'Berhasil mendaftarkan akun.',
          });
          replace('Login' as never);
        })
        .catch(err => {
          console.log('err register: ', err.response);
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        })
        .finally(() => dispatch(setRegisterLoading(false)));
    };
