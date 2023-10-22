import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showDashboard: any
    showDashboardLoading: boolean
    showBankList: any
    showBankDetails: any,
    showBankListLoading: boolean
}

const initialState: InitialState = {
    showDashboard: null,
    showBankList: null,
    showBankDetails: null,
    showBankListLoading: false,
    showDashboardLoading: false,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setShowDashboard: (state, action) => {
            state.showDashboard = action.payload;
        },
        setShowDashboardLoading: (state, action) => {
            state.showDashboardLoading = action.payload;
        },
        setShowBankList: (state, action) => {
            state.showBankList = action.payload;
        },
        setShowBankListLoading: (state, action) => {
            state.showBankListLoading = action.payload;
        },
        setShowBankDetail: (state, action) => {
            state.showBankDetails = action.payload;
        },

    },
});

export default dashboardSlice.reducer;

export const {
    setShowDashboard, setShowDashboardLoading, setShowBankList, setShowBankListLoading, setShowBankDetail } = dashboardSlice.actions;
