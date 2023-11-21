import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { setShowBuktiHasilPortofolioDetail, setShowBuktiHasilPortofolioLoadingDetail, setshowPortofolio, setshowPortofolioDetail, setshowPortofolioLoading, setshowPortofolioLoadingDetail } from '../store/portofolio';
import { getStorage, removeStorage } from '../utils/storage';
import { setToken } from '../store/user';
import { navigationRef } from '../navigation/RootNavigation';
import { logout } from './user';

export const getShowPortofolio = (params = `${API}/pengajuan`) => async (dispatch: RootDispatch) => {
  dispatch(setshowPortofolioLoading(true));
  let data;
  await axios
    .get(params, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setshowPortofolio(res?.data));
      dispatch(setshowPortofolioLoading(false));
      data = res?.data
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(setshowPortofolioLoading(false));
      if (err?.response?.status === 401) {
        removeStorage('token');
        dispatch(setToken(null));
        navigationRef.navigate('Login');
      }
    });
  return data;
};

export const getPembatalanPortofolioDetail = (params: any, setShowModalBatal: any) => async (dispatch: RootDispatch) => {
  axios
    .delete(`${API}/pengajuan/${params}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(getShowPortofolio(`${API}/pengajuan`))
      setShowModalBatal(false)
      setTimeout(() => navigationRef.navigate("Portofolio"), 1500);
    })
    .catch(err => {
      if (err?.response?.status === 401) {
        dispatch(logout())
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data ? JSON.stringify(err.response?.data) : err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
    });
};

export const getPenarikanPortofolioDetail = (params: any, setShowModalBatal: any) => async (dispatch: RootDispatch) => {
  axios
    .post(`${API}/penarikan/${params}`, null, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(() => {
      dispatch(getShowPortofolio(`${API}/pengajuan`))
      setShowModalBatal(false)
      setTimeout(() => navigationRef.navigate("Portofolio"), 1500)
    })
    .catch(err => {
      if (err?.response?.status === 401) {
        dispatch(logout())
      }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data ? JSON.stringify(err.response?.data) : err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
    });
};

export const getShowPortofolioDetail = (params: any) => async (dispatch: RootDispatch) => {
  dispatch(setshowPortofolioLoadingDetail(true));
  axios
    .get(`${API}/pengajuan/${params}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setshowPortofolioDetail(res?.data));
      dispatch(setshowPortofolioLoadingDetail(false));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(setshowPortofolioLoadingDetail(false));
      if (err?.response?.status === 401) {
        removeStorage('token');
        dispatch(setToken(null));
        navigationRef.navigate('Login');
      }
    });
};

export const getShowBuktiBagiHasilPortofolioDetail = (params: any) => async (dispatch: RootDispatch) => {
  dispatch(setShowBuktiHasilPortofolioLoadingDetail(true));
  axios
    .get(`${API}/buktibagihasil/${params}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setShowBuktiHasilPortofolioDetail(res?.data));
      dispatch(setShowBuktiHasilPortofolioLoadingDetail(false));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(setShowBuktiHasilPortofolioLoadingDetail(false));
      if (err?.response?.status === 401) {
        removeStorage('token');
        dispatch(setToken(null));
        navigationRef.navigate('Login');
      }
    });
};
