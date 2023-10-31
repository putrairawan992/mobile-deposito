import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showBankListData: any
    showBankListDataLoading: boolean,
}

const initialState: InitialState = {
    showBankListData: null,
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
    },
});

export default bankSlice.reducer;

export const {
    setShowBankListData, setShowBankListDataLoading } = bankSlice.actions;
