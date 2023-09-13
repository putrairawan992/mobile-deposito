import axios from 'axios';
import store, { RootDispatch } from '../store';
import { API } from '../utils/constant';
import Toast from 'react-native-toast-message';
import { setShowDashboard, setShowDashboardLoading } from '../store/dashboard';

export const getShowDashboard = () => async (dispatch: RootDispatch) => {
  dispatch(setShowDashboardLoading(true));
  axios
    .get(`${API}/dashboard`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${store.getState().userReducer.token}`,
      },
    })
    .then(res => {
      console.log("dashboard",res?.data?.data);
      
      dispatch(setShowDashboard(res?.data?.data));
      dispatch(setShowDashboardLoading(false));
    })
    .catch(err => {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2:
          err.response?.data ?? 'Terjadi error, coba lagi nanti.',
      })
      dispatch(setShowDashboardLoading(false));
    });
};
