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
  setRegisterPasswordPinLoading,
  setToken,
  setUpdateRegisterLoading,
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
        })
        .catch(err => {
          console.log(err.response?.data?.message);

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
      await axios
        .post(`${API}/login`, { username: emailOrPhone, password: password }, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getStorage('token')}`
          }
        })
        .then(res => {
          dispatch(setUser(res?.data));
          addStorage('token', res?.data?.token);
          setItem("token-expired", res?.data?.token, 666);
          addStorage('phone-email', emailOrPhone);
          dispatch(setToken(res?.data?.token));
          dispatch(getUserProfile())
          dispatch(getDetailNasabah()).then((res: any) => {
            if (res?.idUserNasabah) {
              navigationRef.navigate("MyTabs");
              removeStorage("register-completed");
            } else {
              navigationRef.navigate("SplashLogin")
            }
          });
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
  let data;
  await axios
    .get(`${API}/nasabah`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setDetailNasabah(res?.data?.data[0]))
      data = res?.data?.data[0]
    })
    .catch(err => {
      if (err?.response?.status === 401) {
        dispatch(logout())
      }
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
  return data;
};

export const getUserProfile = () => async (dispatch: RootDispatch) => {
  let data;
  await axios
    .get(`${API}/userprofile`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setUserProfile(res.data));
      data = res.data;
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
    });
  return data;
};

export const logout = () => async (dispatch: any) => {
  dispatch(setToken(null));
  dispatch(setUser(null));
  dispatch(setPhoneEmail(null));
  dispatch(setUserProfile(null));
  const keys = await AsyncStorage.getAllKeys()
  await AsyncStorage.multiRemove(keys)
  navigationRef.reset({ index: 0, routes: [{ name: 'Splash' }] });
};

export const updateNasabah =
  (payload: any, setShowModalSuccess: any) =>
    async (dispatch: RootDispatch) => {
      dispatch(setUpdateRegisterLoading(false));
      axios
        .post(
          `${API}/nasabah`,
          payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "type": "formData",
            Authorization: `Bearer ${await getStorage('token')}`
          },
          transformRequest: (data) => {
            console.log("transformRequest", data);
            return data; // thats enough
          },
        },
        )
        .then(() => {
          dispatch(setUpdateRegisterLoading(false));
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'update akun.',
          });
          setShowModalSuccess(true);
          dispatch(getDetailNasabah());
          navigationRef.navigate('Profile')
        })
        .catch(err => {
          dispatch(setUpdateRegisterLoading(false));
          Toast.show({
            type: 'error',
            text1: 'Error' + err?.response?.data?.errors?.pin[0],
            text2:
              JSON.stringify(err.response?.data) ?? 'Terjadi error, coba lagi nanti.',
          });
        });
    };

export const uploadBuktiPengajuan =
  (payload: any, params: string, validSubmit: any) =>
    async (dispatch: RootDispatch) => {
      axios
        .post(
          validSubmit ? `${API}/buktipengajuan/update/${params}` : `${API}/buktipengajuan/${params}`,
          payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "type": "formData",
            Authorization: `Bearer ${await getStorage('token')}`
          },
          transformRequest: (data) => {
            console.log("transformRequest", data);
            return data; // thats enough
          },
        },
        )
        .then(() => {
          Toast.show({
            type: 'success',
            text1: 'Success',
            text2: 'Upload Bukti Berhasil',
          });
          navigationRef.navigate('Portofolio');
        })
        .catch(err => {
          if (err?.response?.status !== 401) {
            Toast.show({
              type: 'error',
              text1: 'Error' + err?.response?.data?.message,
              text2:
                JSON.stringify(err.response?.data) ?? 'Terjadi error, coba lagi nanti.',
            });
          }
        });
    };

export const registerNasabah =
  (payload: any, email?: string) =>
    async (dispatch: RootDispatch) => {
      dispatch(setRegisterLoading(true));
      axios
        .post(
          `${API}/regnasabah`,
          payload, {
          headers: {
            "Content-Type": "multipart/form-data",
            "Accept": "application/json",
            "type": "formData",
            Authorization: `Bearer ${await getStorage('token')}`
          },
          transformRequest: (data) => {
            console.log("transformRequest", data);
            return data; // thats enough
          },
        },
        )
        .then((res) => {
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
            text1: email,
            text2: JSON.stringify(err.response?.data) ?? 'Terjadi error, coba lagi nanti.',
          });
        }).finally(() => dispatch(setRegisterLoading(false)));
    };

export const registerPasswordPin =
  (payload: any, route = 'PIN') =>
    async (dispatch: RootDispatch) => {
      dispatch(setRegisterPasswordPinLoading(true));
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
            text2: res?.data ?? `Berhasil Membuat ${route === 'PIN' ? 'PIN' : 'Password'}`,
          });
          dispatch(setRegisterPasswordPinLoading(false));
          if (route === 'MyTabs') {
            dispatch(getDetailNasabah());
            dispatch(getUserProfile());
          }
          navigationRef.navigate(route as any);
        })
        .catch(err => {
          dispatch(setRegisterPasswordPinLoading(false));
          Toast.show({
            type: 'error',
            text1: 'Error',
            text2:
              err.response?.data ?? err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        })
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
            text2: 'Reset Password',
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
