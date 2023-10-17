import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { setShowBankList, setShowBankListLoading, setShowDashboard, setShowDashboardLoading } from '../store/dashboard';
import { getStorage } from '../utils/storage';

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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
        err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(setShowBankListLoading(false));
    });
};

export const postShowBankList = (payload:any,setShowModalSuccess:any) => async (dispatch: RootDispatch) => {
  dispatch(setShowBankListLoading(true));
  axios
    .post(`${API}/rekbank`, {
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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(setShowBankListLoading(false));
    });
};
