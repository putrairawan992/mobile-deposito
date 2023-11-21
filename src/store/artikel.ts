import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showArtikelListData: any
    showArtikelListDataLoading: boolean,
    showArtikelDetailData: any
    showArtikelDetailDataLoading: boolean,
}

const initialState: InitialState = {
    showArtikelListData: null,
    showArtikelListDataLoading: false,
    showArtikelDetailData:null,
    showArtikelDetailDataLoading:false
};

export const artikelSlice = createSlice({
    name: 'artikel',
    initialState,
    reducers: {
        setShowArtikelListData: (state, action) => {
            state.showArtikelListData = action.payload;
        },
        setShowArtikelListDataLoading: (state, action) => {
            state.showArtikelListDataLoading = action.payload;
        },
        setShowArtikelDetailData: (state, action) => {
            state.showArtikelDetailData = action.payload;
        },
        setShowArtikelDetailDataLoading: (state, action) => {
            state.showArtikelDetailDataLoading = action.payload;
        },
    },
});

export default artikelSlice.reducer;

export const {
    setShowArtikelDetailData,setShowArtikelDetailDataLoading,setShowArtikelListData, setShowArtikelListDataLoading } = artikelSlice.actions;
