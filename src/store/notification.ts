import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showNotificationList: any
    showNotificationListLoading: boolean,
    showReadNotificationList: any
    showReadNotificationListLoading: boolean,
}

const initialState: InitialState = {
    showReadNotificationList: null,
    showNotificationListLoading: false,
    showNotificationList: null,
    showReadNotificationListLoading: false
};

export const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setShowNotificationList: (state, action) => {
            state.showNotificationList = action.payload;
        },
        setShowNotificationListLoading: (state, action) => {
            state.showNotificationListLoading = action.payload;
        },
        setShowReadNotificationList: (state, action) => {
            state.showReadNotificationList = action.payload;
        },
        setShowReadNotificationListLoading: (state, action) => {
            state.showReadNotificationListLoading = action.payload;
        },
    },
});

export default notificationSlice.reducer;

export const {
    setShowNotificationList, setShowNotificationListLoading,
    setShowReadNotificationList,
    setShowReadNotificationListLoading } = notificationSlice.actions;
