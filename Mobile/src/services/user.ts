import axios from 'axios';
import store, { RootDispatch } from '../store';
import { API } from '../utils/constant';
import {
  setCheckLogin,
  setCheckLoginLoading,
  setDetailNasabah,
  setDetailNasabahDetailLoading,
  setForgotLoading,
  setLoginLoading,
  setPhoneEmail,
  setRegisterLoading,
  setToken,
  setUser,
  setUserProfile,
} from '../store/user';
import Toast from 'react-native-toast-message';
import { addStorage, getStorage, removeStorage, setItem } from '../utils/storage';
import { navigationRef } from '../navigation/RootNavigation';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const checkLogin =
  (emailOrPhone: string) =>
    async (dispatch: RootDispatch) => {
      dispatch(setCheckLoginLoading(true));
      axios
        .post(`${API}/ceklogin`, { username: emailOrPhone },
          {
            headers: {
              'Content-Type': 'application/json'
            }
          })
        .then((res) => {
          dispatch(setCheckLogin(res?.data?.data));
          dispatch(setCheckLoginLoading(false));
          dispatch(setPhoneEmail(emailOrPhone));
          addStorage('typeLogin', res?.data?.data === 'password' ? 'Password' : 'OTP');
          navigationRef.navigate(res?.data?.data === 'password' ? 'Password' : 'OTP', {
            emailOrPhone,
          });
          Toast.show({
            type: 'success',
            text1: '',
            text2:
              `Berhasil Kirim ${res?.data?.data === 'password' ? 'Password' : 'OTP'}`,
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
        .post(`${API}/login`, { username: emailOrPhone, password: password }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getStorage('token')}`
          }
        })
        .then(res => {
          dispatch(setUser(res?.data));
          addStorage('token', res?.data?.token);
          addStorage('loginIsOke', 'loginIsOkeTrue');
          setItem("token-expired", res?.data?.token, 10);
          dispatch(setToken(res?.data?.token));
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
          });
        })
        .finally(() => dispatch(setLoginLoading(false)));
    };

export const getReqOtp = () => async (dispatch: RootDispatch) => {
  axios
    .get(`${API}/reqotp`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      Toast.show({
        type: 'success',
        text1: 'Success',
        text2: 'Req OTP.',
      });
    })
    .catch(err => Toast.show({
      type: 'error',
      text1: 'Error',
      text2:
        err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
    }));
};

export const getDetailNasabah = () => async (dispatch: RootDispatch) => {
  dispatch(setDetailNasabahDetailLoading(true));
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
      if (err?.response?.status !== 401) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
        })
      }
    }).finally(() => {
      dispatch(setDetailNasabahDetailLoading(false));
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
    .catch(err => {
      if (err?.response?.status === 401) {
        removeStorage('token');
        dispatch(setToken(null));
        navigationRef.navigate('Login');
      }
      if (err?.response?.status !== 401) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
        })
      }
    });
};

export const logout = () => async (dispatch: any) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  dispatch(setPhoneEmail(null));
  const keys = await AsyncStorage.getAllKeys()
  await AsyncStorage.multiRemove(keys)
  navigationRef.reset({ index: 0, routes: [{ name: 'Splash' }] });
};

export const updateNasabah =
  (payload: any, setShowModalSuccess: any) =>
    async (dispatch: RootDispatch) => {
      axios
        .post(
          `${API}/nasabah`,
          payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
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
          navigationRef.navigate('Profile')
        })
        .catch(err => {
          if (err?.response?.status === 401) {
            removeStorage('token');
            dispatch(setToken(null));
            navigationRef.navigate('Login');
          }
          if (err?.response?.status !== 401) {
            Toast.show({
              type: 'error',
              text1: 'Error' + err?.response?.data?.errors?.pin[0],
              text2:
                err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
            });
          }
        });
    };

export const registerNasabah =
  (payload: any) =>
    async (dispatch: RootDispatch) => {
      dispatch(setRegisterLoading(true));
      axios
        .post(
          `${API}/regnasabah`,
          payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${await getStorage('token')}`
          },
          transformRequest: (data) => {
            return data; // thats enough
          },
        },
        )
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'mendaftarkan akun.',
          });
          navigationRef.navigate(
            store.getState().userReducer?.checkLogin === 'password' ? 'MyTabs' : 'BuatPassword'
          );
          addStorage('register-completed', 'yes');
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: err.response?.data?.errors?.ktp[0] ?? 'Error',
            text2: err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
          if (err?.response?.status === 401) {
            // removeStorage('token');
            // dispatch(setToken(null));
            navigationRef.navigate('Login');
          }
        }).finally(() => dispatch(setRegisterLoading(false)));
    };

export const registerPasswordPin =
  (payload: any, route = 'PIN') =>
    async (dispatch: RootDispatch) => {
      axios
        .put(
          `${API}/upuser`,
          payload
          , {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await getStorage('token')}`
            }
          },
        )
        .then((res) => {
          Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: res?.data ?? 'Berhasil Membuat Password / Pin',
          });
          navigationRef.navigate(route as any);
        })
        .catch(err => {
          if (err?.response?.status === 401) {
            removeStorage('token');
            dispatch(setToken(null));
            navigationRef.navigate('Login');
          }
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data ?? err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
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
          payload
          , {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${await getStorage('token')}`
            }
          },
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
          if (err?.response?.status === 401) {
            removeStorage('token');
            dispatch(setToken(null));
            navigationRef.navigate('Login');
          }
        }).finally(() => dispatch(setForgotLoading(false)));
    };     
