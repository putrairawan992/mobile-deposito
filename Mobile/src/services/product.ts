import axios from 'axios';
import store, { RootDispatch } from '../store';
import { API } from '../utils/constant';
import { setShowProductLoading, setShowProducts, showProductDetail, showProductDetailLoading, showPromo, showPromoLoading } from '../store/product';
import Toast from 'react-native-toast-message';

export const getShowPromo = () => async (dispatch: RootDispatch) => {
  dispatch(showPromoLoading(true));
  axios
    .get(`${API}/showpromo`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().userReducer.token}`,
      },
    })
    .then(res => {
      dispatch(showPromo(res.data));
      dispatch(showPromoLoading(false));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(showPromoLoading(false));
    });

};

export const getShowProductNasabah = () => async (dispatch: RootDispatch) => {
  dispatch(setShowProductLoading(true));
  axios
    .get(`${API}/showproduk`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().userReducer.token}`,
      },
    })
    .then(res => {
      dispatch(setShowProducts(res.data));
      dispatch(setShowProductLoading(false));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(setShowProductLoading(false));
    });

};

export const getShowProductNasabahDetail = (id: any) => async (dispatch: RootDispatch) => {
  dispatch(showProductDetailLoading(true));
  axios
    .get(`${API}/api/produk/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().userReducer.token}`,
      },
    })
    .then(res => {
      dispatch(showProductDetail(res.data));
      dispatch(showProductDetailLoading(false));
    })
    .catch(err => {
      console.log(err?.response);

      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(showProductDetailLoading(false));
    });

};
