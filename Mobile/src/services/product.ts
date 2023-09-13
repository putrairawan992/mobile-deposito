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
      console.log("getShowPromo",res?.data?.data);
      
      dispatch(showPromo(res?.data?.data));
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
      dispatch(setShowProducts(res.data?.data));
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
    .get(`https://dev.depositosyariah.id/api/produk/D2308636522`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().userReducer.token}`,
      },
    })
    .then(res => {
      console.log("produk-det",res.data);
      
      dispatch(showProductDetail(res.data?.data));
      dispatch(showProductDetailLoading(false));
    })
    .catch(err => {
      console.log("produk-err",store.getState().userReducer.token);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data?.message ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(showProductDetailLoading(false));
    });

};
