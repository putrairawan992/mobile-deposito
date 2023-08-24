import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showProduct: any
    showProcutLoading: boolean
    showProductDetail: any
    showProductDetailLoading: boolean
}

const initialState: InitialState = {
    showProduct: null,
    showProcutLoading: false,
    showProductDetail: null,
    showProductDetailLoading: false
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setShowProducts: (state, action) => {
            state.showProduct = action.payload;
        },
        setShowProductLoading: (state, action) => {
            state.showProcutLoading = action.payload;
        },
        showProductDetail: (state, action) => {
            state.showProductDetail = action.payload;
        },
        showProductDetailLoading: (state, action) => {
            state.showProductDetailLoading = action.payload;
        }
    },
});

export default productSlice.reducer;

export const {
    setShowProducts, setShowProductLoading, showProductDetail, showProductDetailLoading
} = productSlice.actions;
