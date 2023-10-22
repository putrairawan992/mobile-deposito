import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { setShowBankDetail, setShowBankList, setShowBankListLoading, setShowDashboard, setShowDashboardLoading } from '../store/dashboard';
import { getStorage, removeStorage } from '../utils/storage';
import { setToken } from '../store/user';
import { navigationRef } from '../navigation/RootNavigation';

export const getShowDashboard = () => async (dispatch: RootDispatch) => {
  dispatch(setShowDashboardLoading(true));
  axios
    .get(`${API}/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setShowDashboard(res?.data?.data));
      dispatch(setShowDashboardLoading(false));
    })
    .catch(err => {
      if (err.response?.status !== 401) {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2:
            err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
        })
      }
      dispatch(setShowDashboardLoading(false));
    });
};

export const getShowBankList = () => async (dispatch: RootDispatch) => {
  dispatch(setShowBankListLoading(true));
  axios
    .get(`${API}/rekbank`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setShowBankList(res?.data));
      dispatch(setShowBankListLoading(false));
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
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(setShowBankListLoading(false));
    });
};

export const postShowBankList = (payload: any, setShowModalSuccess: any) => async (dispatch: RootDispatch) => {
  axios.post(`${API}/rekbank`, payload, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Bearer ${await getStorage('token')}`,
    },
  })
    .then(res => {
      setShowModalSuccess(true);
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
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
    });
};


export const defaultBankShowList = (id: any, actionGetBankList: any) => async (dispatch: RootDispatch) => {
  axios
    .put(
      `${API}/rekbank/${id}`, {
      headers: {
        Authorization: `Bearer ${await getStorage('token')}`
      }
    },
    )
    .then((res) => {
      Toast.show({
        type: 'success',
        text1: 'Sukses',
        text2: res?.data ?? 'Berhasil Default Bank',
      });
      actionGetBankList();
    })
    .catch(err => {
      // if (err?.response?.status === 401) {
      //   removeStorage('token');
      //   dispatch(setToken(null));
      //   navigationRef.navigate('Login');
      // }
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data ?? err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      });
    });
};


export const getBankDetailList = (id: any) => async (dispatch: RootDispatch) => {
  axios
    .get(
      `${API}/rekbank/${id}`, {
      headers: {
        Authorization: `Bearer ${await getStorage('token')}`
      }
    },
    )
    .then((res) => {
      dispatch(setShowBankDetail(res.data));
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


export const deleteBankDetailList = (id: any,setShowModalSuccess:any) => async (dispatch: RootDispatch) => {
  axios
    .delete(
      `${API}/rekbank/${id}`, {
      headers: {
        Authorization: `Bearer ${await getStorage('token')}`
      }
    },
    )
    .then((res) => {
      setShowModalSuccess(true);
    })
    .catch(err => {
      console.log(err?.response?.data);
      
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
