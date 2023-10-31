import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { getStorage } from '../utils/storage';
import { setShowBankListData, setShowBankListDataLoading } from '../store/bank';
import { logout } from './user';


export const getShowBankListData = (params?: any) => async (dispatch: RootDispatch) => {
    dispatch(setShowBankListDataLoading(true));
    axios
        .get(`${API}/bank/search?${params}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setShowBankListData(res?.data));
            dispatch(setShowBankListDataLoading(false));
        }).catch(err => {
            if (err?.response?.status === 401) {
                dispatch(logout())
            }
            Toast.show({
                type: 'error',
                text1: 'Error',
                text2:
                    err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
            })
        })
};


