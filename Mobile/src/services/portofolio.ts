import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { setshowPortofolio, setshowPortofolioDetail, setshowPortofolioLoading, setshowPortofolioLoadingDetail } from '../store/portofolio';
import { getStorage, removeStorage } from '../utils/storage';
import { setToken } from '../store/user';
import { navigationRef } from '../navigation/RootNavigation';

export const getShowPortofolio = (params: string) => async (dispatch: RootDispatch) => {
  dispatch(setshowPortofolioLoading(true));
  axios
    .get(params ? `${API}/pengajuan${params}` : `${API}/pengajuan`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setshowPortofolio(res?.data));
      dispatch(setshowPortofolioLoading(false));
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
