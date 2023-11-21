import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { getStorage } from '../utils/storage';
import { logout } from './user';
import { setShowArtikelDetailData, setShowArtikelDetailDataLoading, setShowArtikelListData, setShowArtikelListDataLoading } from '../store/artikel';


export const getShowArtikelList = () => async (dispatch: RootDispatch) => {
    dispatch(setShowArtikelListDataLoading(true));
    axios
        .get(`${API}/artikel`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setShowArtikelListData(res.data));
        }).catch(err => {
            console.log("error", err);

            if (err?.response?.status === 401) {
                dispatch(logout())
            }
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
            })
        }).finally(() => {
            setShowArtikelListDataLoading(false);
        })
};

export const getShowArtikelDetaill = (id:any) => async (dispatch: RootDispatch) => {
    dispatch(setShowArtikelDetailDataLoading(true));
    axios
        .get(`${API}/artikel/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setShowArtikelDetailData(res.data));
        }).catch(err => {
            console.log("error", err);

            if (err?.response?.status === 401) {
                dispatch(logout())
            }
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
            })
        }).finally(() => {
            dispatch(setShowArtikelDetailDataLoading(false));
        })
};


