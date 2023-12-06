import axios from 'axios';
import { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { getStorage } from '../utils/storage';
import { logout } from './user';
import { setShowNotificationList, setShowReadNotificationList, setShowReadNotificationListLoading } from '../store/notification';
import { navigationRef } from '../navigation/RootNavigation';


export const getShowNotificationList = () => async (dispatch: RootDispatch) => {
    dispatch(setShowReadNotificationListLoading(true));
    axios
        .get(`${API}/notif`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setShowNotificationList(res.data));
        }).catch(err => {
            console.log("error", err);

            if (err?.response?.status === 401) {
                dispatch(logout())
            }
            // Toast.show({
            //     type: 'error',
            //     text1: 'Perhatian',
            //     text2:
            //         err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
            // })
        }).finally(() => {
            dispatch(setShowReadNotificationListLoading(false));
        })
};

export const getShowNotificationChat = (setChatNotifState?:any) => async (dispatch: RootDispatch) => {
    axios
        .get(`${API}/chat`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setChatNotifState(res.data));
        })
};

export const getShowReadNotificationList = (id:any) => async (dispatch: RootDispatch) => {
    dispatch(setShowReadNotificationListLoading(true));
    axios
        .get(`${API}/notif/${id}`, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${await getStorage('token')}`,
            },
        })
        .then(res => {
            dispatch(setShowReadNotificationList(res.data));
        }).catch(err => {
            console.log("error", err);

            if (err?.response?.status === 401) {
                dispatch(logout())
            }
            Toast.show({
                type: 'error',
                text1: 'Perhatian',
                text2:
                    err.response?.data?.message ?? err.response?.data ?? 'Terjadi error, coba lagi nanti.',
            })
        }).finally(() => {
            dispatch(setShowReadNotificationListLoading(false));
        })
};


