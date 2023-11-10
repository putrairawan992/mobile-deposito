import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { setShowBankDetail, setShowBankList, setShowBankListLoading, setShowBankListLoadingProduct, setShowBankListProduct, setShowDashboard, setShowDashboardLoading, setShowDashboardSkLoading, setShowFaqDashboard, setShowFaqDashboardLoading, setShowSkDashboard, setShowSplashListLoading, setSplashDashboard } from '../store/dashboard';
import { getStorage, removeStorage } from '../utils/storage';
import { setToken } from '../store/user';
import { navigationRef } from '../navigation/RootNavigation';



export const getFaqDashboard = (params?: any) => async (dispatch: RootDispatch) => {
  dispatch(setShowFaqDashboardLoading(true));
  axios
    .get(params, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setShowFaqDashboard(res?.data));
      dispatch(setShowFaqDashboardLoading(false));
    }).catch(err => {
      dispatch(setShowFaqDashboardLoading(false));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
    });;
};

export const getSplashDashboard = () => async (dispatch: RootDispatch) => {
  dispatch(setShowSplashListLoading(true));
  axios
    .get(`${API}/splash`)
    .then(res => {
      dispatch(setSplashDashboard(res?.data));
      dispatch(setShowSplashListLoading(false));
    }).catch(err => {
      dispatch(setShowSplashListLoading(false));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
    });;
};

export const getShowDashboard = () => async (dispatch: RootDispatch) => {
  dispatch(setShowDashboardLoading(true));
  let data;
  await axios
    .get(`${API}/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      data = res?.data?.data
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
    return data;
};

export const getSkDashboard = () => async (dispatch: RootDispatch) => {
  dispatch(setShowDashboardSkLoading(true));
  axios
    .get(`${API}/sk`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setShowSkDashboard(res?.data));
      dispatch(setShowDashboardSkLoading(false));
    }).catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
      })
    })
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
    }).catch(err => {
      dispatch(setShowBankListLoading(false));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
      })
    })
};

export const getShowBankListProduk = () => async (dispatch: RootDispatch) => {
  dispatch(setShowBankListLoadingProduct(true));
  axios
    .get(`${API}/rekbankuser`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      console.log("ress==>",res?.data);
      
      dispatch(setShowBankListProduct(res?.data));
      dispatch(setShowBankListLoadingProduct(false));
    }).catch(err => {
      dispatch(setShowBankListLoadingProduct(false));
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
      })
    })
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

export const defaultBankShowList = (id: any) => async (dispatch: RootDispatch) => {
  axios
    .put(`${API}/defrekbank/${id}`, null, {
      headers: {
        Authorization: `Bearer ${await getStorage('token')}`
      }
    },
    )
    .then((res) => {
      Toast.show({
        type: 'success',
        text1: 'Sukses',
        text2: res?.data?.message ?? 'Berhasil Default Bank',
      });
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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      });
    });
};

export const deleteBankDetailList = (id: any, setShowModalSuccess: any, payload: any) => async (dispatch: RootDispatch) => {
  axios
    .put(
      `${API}/rekbank/${id}`, payload, {
      headers: {
        Authorization: `Bearer ${await getStorage('token')}`
      }
    },
    )
    .then((res) => {
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
