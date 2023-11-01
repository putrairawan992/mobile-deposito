import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { getStorage } from '../utils/storage';
import { logout } from './user';
import { setShowJenisKeluhanChat, setShowJenisKeluhanChatLoading, setShowKeluhanChat, setShowKeluhanChatDetail, setShowKeluhanChatDetailLoading, setShowKeluhanChatLoading, setShowPostKeluhanChatDetail, setShowPostKeluhanChatDetailLoading } from '../store/chat';


export const getChatListKeluhan = (params?: any) => async (dispatch: RootDispatch) => {
    dispatch(setShowKeluhanChatLoading(true));
    axios
        .get(`${API}/keluhan?user=${params}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setShowKeluhanChat(res?.data));
            dispatch(setShowKeluhanChatLoading(false));
        }).catch(err => {
            dispatch(setShowKeluhanChatLoading(false));
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

export const getChatListDetailKeluhan = (params?: any) => async (dispatch: RootDispatch) => {
    dispatch(setShowKeluhanChatDetailLoading(true));
    axios
        .get(`${API}/keluhan/${params}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setShowKeluhanChatDetail(res?.data));
            dispatch(setShowKeluhanChatDetailLoading(false));
        }).catch(err => {
            dispatch(setShowKeluhanChatDetailLoading(false));
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

export const postChatListDetailKeluhan = (params?: any) => async (dispatch: RootDispatch) => {
   dispatch(setShowPostKeluhanChatDetailLoading(true));
    axios
        .post(`${API}/keluhan/`, params, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setShowPostKeluhanChatDetail(res?.data));
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
        }).finally(() => {
            dispatch(setShowPostKeluhanChatDetailLoading(false));
        });
};

export const getChatJenisListKeluhan = () => async (dispatch: RootDispatch) => {
    dispatch(setShowJenisKeluhanChatLoading(true));
    axios
        .get(`${API}/jeniskeluhan`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setShowJenisKeluhanChat(res?.data));
            dispatch(setShowJenisKeluhanChatLoading(false));
        }).catch(err => {
            dispatch(setShowJenisKeluhanChatLoading(false));
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


