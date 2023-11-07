import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showDashboard: any
    showSplashDashboard: any,
    showDashboardLoading: boolean
    showBankList: any
    showBankListProduct: any
    showBankDetails: any,
    showSplashListLoading: boolean,
    showBankListLoading: boolean,
    showBankListLoadingProduct: boolean,
    showSkDashboard: any,
    showSkDashboardLoading: boolean,
    showFaqDashboard: any,
    showFaqDashboardLoading: boolean
}

const initialState: InitialState = {
    showBankListLoadingProduct: false,
    showBankListProduct: null,
    showSplashListLoading: false,
    showSplashDashboard: null,
    showDashboard: null,
    showBankList: null,
    showBankDetails: null,
    showBankListLoading: false,
    showDashboardLoading: false,
    showSkDashboardLoading: false,
    showSkDashboard: null,
    showFaqDashboard: null,
    showFaqDashboardLoading: false
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
        setShowBankListProduct: (state, action) => {
            state.showBankListProduct = action.payload;
        },
        setShowBankListLoadingProduct: (state, action) => {
            state.showBankListLoadingProduct = action.payload;
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
        setShowFaqDashboard: (state, action) => {
            state.showFaqDashboard = action.payload;
        },
        setShowFaqDashboardLoading: (state, action) => {
            state.showFaqDashboardLoading = action.payload;
        },
    },
});

export default dashboardSlice.reducer;

export const {
    setShowFaqDashboard, setShowFaqDashboardLoading,
    setShowSkDashboard, setShowDashboardSkLoading, setShowSplashListLoading, setSplashDashboard, setShowDashboard, setShowDashboardLoading, setShowBankList, setShowBankListLoading, setShowBankDetail, setShowBankListProduct, setShowBankListLoadingProduct } = dashboardSlice.actions;
