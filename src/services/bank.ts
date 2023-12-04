import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { addStorage, getStorage, removeStorage } from '../utils/storage';
import { setShowBankListData, setShowBankListDataLoading } from '../store/bank';
import { logout } from './user';
import { postShowBankList } from './dasbhoard';


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
                text1: 'Perhatian',
                text2:
                    err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
            })
        })
};

export const getValidationBankListData = (params: any, setDataBank: any, setIsLoading?: any) => async (dispatch: RootDispatch) => {
    setIsLoading(true);
    axios
        .post(`https://api.kasku.co.id/api/auth/signin`, {
            "username": "kasku_api_ds",
            "password": "K4sku!4p1!D5"
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(res => {
            console.log("ressstatus", res?.data);
            addStorage("bank_validate_token", res?.data?.accessToken);
            setTimeout(() => {
                dispatch(submitValidationBank(params, setDataBank, setIsLoading))
            }, 500);
        }).catch(err => {
            console.log("error", err);
            setIsLoading(false);
            Toast.show({
                type: 'error',
                text1: 'Perhatian',
                text2:
                    err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
            })
        })

}

export const submitValidationBank = (params: any, setDataBank: any, setIsLoading?: any) => async (dispatch: RootDispatch) => {
    setIsLoading(true);
    axios.post(`https://api.kasku.co.id/api/other/bank_transfer`, params, {
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': `${await getStorage("bank_validate_token")}`,
        },
    })
        .then(resBank => {
            setDataBank(resBank?.data);
            setIsLoading(false);
            // if (resBank?.data?.success) {
            //     Toast.show({
            //         type: 'success',
            //         text1: 'Perhatian',
            //         text2: resBank?.data?.message,
            //     })
            // }
            removeStorage("bank_validate_token");
        }).catch(async err => {
            setIsLoading(false);
            console.log("errorsubmit", err.response?.data, params);
            Toast.show({
                type: 'error',
                text1: 'Perhatian',
                text2:
                    err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
            })
        })
}
