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
  setLogoNasabah,
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
import { getShowDashboard } from './dasbhoard';

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
          navigationRef.navigate(res?.data?.data === 'password' ? 'Password' : 'OTP', {
            emailOrPhone,
            isResetPassword: false
          });
        })
        .catch(err => {
          console.log("error", err);

          Toast.show({
            type: 'error',
            text1: 'Perhatian',
            text2:
              err.response?.data ?? err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        })
        .finally(() => dispatch(setCheckLoginLoading(false)));
    };

export const login =
  (emailOrPhone: string, password: string, isResetPassword: any) =>
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
          setItem("token-expired", res?.data?.token, 2);
          addStorage('phone-email', emailOrPhone);
          addStorage('passwordSekarang', password);
          removeStorage('@exitTime');
          removeStorage('detected-exitTime');
          dispatch(setToken(res?.data?.token));
          dispatch(getUserProfile());
          dispatch(getShowDashboard()).then((showDash: any) => {
            dispatch(getDetailNasabah()).then((detailNash: any) => {
              if (!showDash?.statuses['5'].status && detailNash?.idUserNasabah) {
                addStorage("resetPass", "passReset")
                navigationRef.navigate("BuatPassword", { isShowDashboard: true });
              } else if (showDash?.statuses['5'].status && detailNash?.idUserNasabah) {
                navigationRef.navigate("MyTabs");
                removeStorage("resetPass");
              } else {
                if (!detailNash?.idUserNasabah) {
                  navigationRef.navigate("SplashLogin");
                }
              }
              dispatch(setLoginLoading(false))
            });

          });
        })
        .catch(err => {
          dispatch(setLoginLoading(false))
          Toast.show({
            type: 'error',
            text1: 'Perhatian',
            text2:
              err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
          });
        })
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
        text1: 'Sukses',
        text2: 'Meminta OTP berhasil'
      });
    })
    .catch(err => Toast.show({
      type: 'error',
      text1: 'Perhatian',
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
        // dispatch(logout())
      }
      if (err?.response?.status !== 401) {
        // Toast.show({
        //   type: 'error',
        //   text1: 'Perhatian',
        //   text2:
        //     err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
        // })
      }
    }).finally(() => {
      dispatch(setDetailNasabahDetailLoading(false));
    });
  return data;
};

export const getLogoNasabah = () => async (dispatch: RootDispatch) => {
  let data;
  await axios
    .get(`${API}/logo`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setLogoNasabah(res?.data?.data))
      data = res?.data?.data[0]
    })
    .catch(err => {
      if (err?.response?.status === 401) {
        // dispatch(logout())
      }
      if (err?.response?.status !== 401) {
        Toast.show({
          type: 'error',
          text1: 'Perhatian',
          text2:
            err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
        })
      }
    })
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
      // if (err?.response?.status !== 401) {
      //   Toast.show({
      //     type: 'error',
      //     text1: 'Perhatian',
      //     text2:
      //       err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      //   })
      // }
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
        .then((res) => {
          dispatch(setUpdateRegisterLoading(false));
          Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: res?.data?.message,
          });
          setShowModalSuccess(true);
          dispatch(getDetailNasabah());
          navigationRef.navigate('Profile')
        })
        .catch(err => {
          dispatch(setUpdateRegisterLoading(false));
          Toast.show({
            type: 'error',
            text1: 'Perhatian',
            text2: err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
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
            text1: 'Sukses',
            text2: 'Upload Bukti Berhasil',
          });
          navigationRef.navigate('Portofolio');
        })
        .catch(err => {
          if (err?.response?.status !== 401) {
            Toast.show({
              type: 'error',
              text1: 'Perhatian' + err?.response?.data?.message,
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
            text1: 'Sukses',
            text2: 'Mendaftarkan akun',
          });
          if (store.getState().userReducer?.checkLogin === 'password') {
            navigationRef.navigate('MyTabs');
          } else {
            navigationRef.navigate('BuatPassword', { isShowDashboard: false })
          }
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Gagal',
            text2: JSON.stringify(err.response?.data) ?? 'Terjadi error, coba lagi nanti.',
          });
        }).finally(() => dispatch(setRegisterLoading(false)));
    };

export const registerPasswordPin =
  (payload: any, route = 'PIN', isShowDashboard: any) =>
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
            text2: res?.data,
          });
          addStorage("passwordSekarang", payload?.password);
          dispatch(setRegisterPasswordPinLoading(false));
          if (route === 'MyTabs') {
            dispatch(getDetailNasabah());
            dispatch(getUserProfile());
          }
          if (isShowDashboard) {
            setTimeout(() => navigationRef.navigate("MyTabs"), 2000);
          } else {
            setTimeout(() => navigationRef.navigate(route as any), 2000);
          }
        })
        .catch(err => {
          console.log("error===>", err.response);

          dispatch(setRegisterPasswordPinLoading(false));
          Toast.show({
            type: 'error',
            text1: 'Perhatian',
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
          dispatch(setForgotLoading(false));
          navigationRef.navigate('OTP', { emailOrPhone, isResetPassword: true });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            text1: 'Perhatian',
            text2:
              err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
        }).finally(() => dispatch(setForgotLoading(false)));
    };     
