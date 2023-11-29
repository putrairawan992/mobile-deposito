import axios from 'axios';
import store, { RootDispatch } from '../store';
import { API } from '../utils/constant';
import { setShowProductLoading, setShowProducts, showProductDetail, showProductDetailLoading, showPromo, showPromoLoading } from '../store/product';
import Toast from 'react-native-toast-message';
import { getStorage, removeStorage } from '../utils/storage';
import { setToken } from '../store/user';
import { navigationRef } from '../navigation/RootNavigation';
import { logout } from './user';
import { getShowPortofolio } from './portofolio';

export const getShowPromo = () => async (dispatch: RootDispatch) => {
  dispatch(showPromoLoading(true));
  axios
    .get(`${API}/showpromo`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(showPromo(res?.data?.data));
      dispatch(showPromoLoading(false));
    })
    .catch(err => {
      if (err?.response?.status === 401) {
        removeStorage('token');
        dispatch(setToken(null));
        navigationRef.navigate('Login');
      }
      // Toast.show({
      //   type: 'error',
      //   text1: 'Perhatian',
      //   text2:
      //     err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      // })
      dispatch(showPromoLoading(false));
    });

};

export const getShowProductNasabah = (params?:any) => async (dispatch: RootDispatch) => {
  dispatch(setShowProductLoading(true));
  axios
    .get(`${API}/produk_search?${params}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(setShowProducts(res.data?.data));
      dispatch(setShowProductLoading(false));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
      if (err?.response?.status === 401) {
        removeStorage('token');
        dispatch(setToken(null));
        navigationRef.navigate('Login');
      }
      dispatch(setShowProductLoading(false));
    });

};

export const getShowProductNasabahDetail = (id: any) => async (dispatch: RootDispatch) => {
  dispatch(showProductDetailLoading(true));
  axios
    .get(`${API}/produk/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await getStorage('token')}`,
      },
    })
    .then(res => {
      dispatch(showProductDetail(res.data?.data));
      dispatch(showProductDetailLoading(false));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Perhatian',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
      if (err?.response?.status === 401) {
        dispatch(logout())
      }
      dispatch(showProductDetailLoading(false));
    });

};

export const postAjukanDeposito =
  (payload: any, setShowmodal: any, setLoadings: any) =>
    async (dispatch: RootDispatch) => {
      let data;
      setLoadings(true);
      axios
        .post(`${API}/pengajuan`, payload, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getStorage('token')}`,
          },
        })
        .then((res) => {
          Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: res?.data?.message,
          });
          setLoadings(false);
          dispatch(getShowPortofolio()).then((result: any) => {
            if (result.data?.length > 0) {
              navigationRef.navigate('PortofolioDetail', { no_transaksi: result?.data[0]?.no_transaksi })
            }
          })
          data = res.data;
        })
        .catch(err => {
          data = err?.response?.data
          setLoadings(false);
          Toast.show({
            type: 'error',
            text1: 'Perhatian',
            text2: err.response?.data?.errors?.amount ?? err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
          if (err?.response?.status === 401) {
            removeStorage('token');
            dispatch(setToken(null));
            navigationRef.navigate('Login');
          }
        })
      return data;
    };

export const estimasiAjukanDeposito =
  (payload: any, setData: any, setLoadings: any) =>
    async (dispatch: RootDispatch) => {
      let data;
      setLoadings(true);
      axios
        .post(`${API}/estimasi`, payload, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await getStorage('token')}`,
          },
        })
        .then((res) => {
          Toast.show({
            type: 'success',
            text1: 'Sukses',
            text2: res?.data?.message,
          });
          setData(res?.data?.data);
          setLoadings(false);
          data = res.data;
        })
        .catch(err => {
          data = err?.response?.data
          setData(null);
          setLoadings(false);
          Toast.show({
            type: 'error',
            text1: 'Perhatian',
            text2: err.response?.data?.errors?.amount ?? err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
          });
          if (err?.response?.status === 401) {
            removeStorage('token');
            dispatch(setToken(null));
            navigationRef.navigate('Login');
          }
        })
      return data;
    };    
