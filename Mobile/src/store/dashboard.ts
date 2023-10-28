import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showDashboard: any
    showSplashDashboard: any,
    showDashboardLoading: boolean
    showBankList: any
    showBankDetails: any,
    showSplashListLoading: boolean,
    showBankListLoading: boolean,
    showSkDashboard:any,
    showSkDashboardLoading: boolean
}

const initialState: InitialState = {
    showSplashListLoading: false,
    showSplashDashboard: null,
    showDashboard: null,
    showBankList: null,
    showBankDetails: null,
    showBankListLoading: false,
    showDashboardLoading: false,
    showSkDashboardLoading:false,
    showSkDashboard:null
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setShowDashboard: (state, action) => {
            state.showDashboard = action.payload;
        },
        setSplashDashboard: (state, action) => {
            state.showSplashDashboard = action.payload;
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
        setShowSplashListLoading: (state, action) => {
            state.showSplashListLoading = action.payload;
        },
        setShowSkDashboard: (state, action) => {
            state.showSkDashboard = action.payload;
        },
        setShowDashboardSkLoading: (state, action) => {
            state.showSkDashboardLoading = action.payload;
        },

    },
});

export default dashboardSlice.reducer;

export const {
    setShowSkDashboard, setShowDashboardSkLoading, setShowSplashListLoading, setSplashDashboard, setShowDashboard, setShowDashboardLoading, setShowBankList, setShowBankListLoading, setShowBankDetail } = dashboardSlice.actions;
