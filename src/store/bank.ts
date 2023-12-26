import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showBankListData: any
    showBankListDataLoading: boolean,
    showKotaData: any,
    showKotaDataLoading: boolean
}

const initialState: InitialState = {
    showBankListData: null,
    showKotaData: null,
    showKotaDataLoading: false,
    showBankListDataLoading: false,
};

export const bankSlice = createSlice({
    name: 'bank',
    initialState,
    reducers: {
        setShowBankListData: (state, action) => {
            state.showBankListData = action.payload;
        },
        setShowBankListDataLoading: (state, action) => {
            state.showBankListDataLoading = action.payload;
        },
        setShowKotaListData: (state, action) => {
            state.showKotaData = action.payload;
        },
        setShowKotaListDataLoading: (state, action) => {
            state.showKotaDataLoading = action.payload;
        },
    },
});

export default bankSlice.reducer;

export const {
   setShowKotaListData,setShowKotaListDataLoading, setShowBankListData, setShowBankListDataLoading } = bankSlice.actions;
