import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showPortofolio: any
    showPortofolioLoading: boolean
    showPortofolioDetail: any
    showPortofolioLoadingDetail: boolean
}

const initialState: InitialState = {
    showPortofolio: null,
    showPortofolioLoading: false,
    showPortofolioDetail: null,
    showPortofolioLoadingDetail: false,
};

export const portofolioSlice = createSlice({
    name: 'portofolio',
    initialState,
    reducers: {
        setshowPortofolio: (state, action) => {
            state.showPortofolio = action.payload;
        },
        setshowPortofolioLoading: (state, action) => {
            state.showPortofolioLoading = action.payload;
        },
        setshowPortofolioDetail: (state, action) => {
            state.showPortofolioDetail = action.payload;
        },
        setshowPortofolioLoadingDetail: (state, action) => {
            state.showPortofolioLoadingDetail = action.payload;
        },

    },
});

export default portofolioSlice.reducer;

export const {
    setshowPortofolio, setshowPortofolioLoading,setshowPortofolioDetail, setshowPortofolioLoadingDetail } = portofolioSlice.actions;
