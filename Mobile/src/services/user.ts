import axios from 'axios';
import store, { RootDispatch } from '../store';
import { API, defaultHeaderAxios } from '../utils/constant';
import {
  setCheckLogin,
  setCheckLoginLoading,
  setDetailNasabah,
  setForgotLoading,
  setLoginLoading,
  setRegisterLoading,
  setToken,
  setUser,
  setUserProfile,
} from '../store/user';
import Toast from 'react-native-toast-message';
import { addStorage, getStorage, removeStorage } from '../utils/storage';
import { navigationRef } from '../navigation/RootNavigation';

export const checkLogin =
  (emailOrPhone: string) =>
    async (dispatch: RootDispatch) => {
      dispatch(setCheckLoginLoading(true));
      axios
        .post(`${API}/ceklogin`, { username: emailOrPhone }, defaultHeaderAxios)
        .then((res) => {
          dispatch(setCheckLogin(res?.data?.data));
          dispatch(setCheckLoginLoading(false))
          navigationRef.navigate(res?.data?.data === 'password' ? 'Password' : 'OTP', {
            emailOrPhone,
          });
          Toast.show({
            type: 'success',
            text1: '',
            text2:
              'Berhasil Kirim OTP',
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
        .finally(() => dispatch(setCheckLoginLoading(false)));
    };

export const login =
  (emailOrPhone: string, password: string) =>
    async (dispatch: any) => {
      dispatch(setLoginLoading(true));
      axios
        .post(`${API}/login`, { username: emailOrPhone, password: password }, defaultHeaderAxios)
        .then(res => {
          dispatch(setUser(res?.data));
          addStorage('token', res?.data?.token);
          dispatch(setToken(res?.data?.token));
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

export const getDetailNasabah = () => async (dispatch: RootDispatch) => {
  axios
    .get(`${API}/nasabah`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setDetailNasabah(res?.data?.data[0]))
    })
    .catch(err => {
      console.log(err);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
    });
};

export const getUserProfile = () => async (dispatch: RootDispatch) => {
  axios
    .get(`${API}/userprofile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setUserProfile(res.data))
    })
    .catch(err => Toast.show({
      type: 'error',
      text1: 'Error',
      text2:
        err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
    }));
};

export const logout = () => async (dispatch: any) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  removeStorage('token');
  navigationRef.reset({ index: 0, routes: [{ name: 'Splash' }] });

};

export const updateNasabah =
  (payload: any, setShowModalSuccess: any) =>
    async () => {
      axios
        .post(
          `${API}/nasabah`,
          payload, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getStorage('token')}`,
          },
        },
        )
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'update akun.',
          });
          setShowModalSuccess(true);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        });
    };

export const registerNasabah =
  (payload: any) =>
    async (dispatch: RootDispatch) => {
      dispatch(setRegisterLoading(true));
      axios
        .post(
          `${API}/regnasabah`,
          payload,
          defaultHeaderAxios,
        )
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'mendaftarkan akun.',
          });
          navigationRef.navigate(
            store.getState().userReducer.checkLogin === 'password' ? 'MyTabs' : 'BuatPassword'
          );
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        }).finally(() => dispatch(setRegisterLoading(false)));
    };

export const registerPasswordPin =
  (payload: any, route = 'PIN') =>
    async (dispatch: RootDispatch) => {
      axios
        .put(
          `${API}/upuser`,
          payload,
          defaultHeaderAxios,
        )
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: 'Berhasil Membuat Password/Pin',
          });
          navigationRef.navigate(route as any);
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        });
    };

export const forgotPasswordPin =
  (payload: any, emailOrPhone: any) =>
    async (dispatch: RootDispatch) => {
      dispatch(setForgotLoading(true));
      axios
        .post(
          `${API}/forgotpassmobile`,
          payload,
          defaultHeaderAxios,
        )
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Reset Password/Pin',
          });
          dispatch(setForgotLoading(false));
          navigationRef.navigate('OTP', { emailOrPhone });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        }).finally(() => dispatch(setForgotLoading(false)));
    };     
