import { createSlice } from '@reduxjs/toolkit';

interface User {
  id: number;
  fullname: string;
  email: string | null;
  phone: string;
  foto: string | null;
  fcm: string | null;
  is_blocked: number;
  verified_at: string | null;
  created_at: string;
  toko?: {
    id: number;
    account_id: number;
    toko_id: number | null;
    address_id: number;
    is_delivery_product: number;
    is_picked_product: number;
    created_at: string;
  };
}

interface InitialState {
  user: User | null;
  token: string | null;
  phone_email: string | null;
  checkLogin: any;
  userProfile: any;
  detailNasabah: any;
  loginLoading: boolean;
  checkLoginLoading: boolean;
  forgotLoading: boolean;
  registerLoading: boolean;
  detailNasabahDetailLoading: boolean;
}

const initialState: InitialState = {
  user: null,
  userProfile: null,
  checkLogin: null,
  detailNasabah: null,
  phone_email: null,
  token: null,
  loginLoading: false,
  checkLoginLoading: false,
  forgotLoading: false,
  registerLoading: false,
  detailNasabahDetailLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setCheckLogin: (state, action) => {
      state.checkLogin = action.payload;
    },
    setPhoneEmail: (state, action) => {
      state.phone_email = action.payload;
    },
    setDetailNasabah: (state, action) => {
      state.detailNasabah = action.payload;
    },
    setDetailNasabahDetailLoading: (state, action) => {
      state.detailNasabahDetailLoading = action.payload;
    },
    setCheckLoginLoading: (state, action) => {
      state.checkLoginLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    setLoginLoading: (state, action) => {
      state.loginLoading = action.payload;
    },
    setRegisterLoading: (state, action) => {
      state.registerLoading = action.payload;
    },
    setForgotLoading: (state, action) => {
      state.forgotLoading = action.payload;
    },
  },
});

export default userSlice.reducer;

export const {
  setPhoneEmail,
  setDetailNasabah,
  setDetailNasabahDetailLoading,
  setUser,
  setUserProfile,
  setToken,
  setLoginLoading,
  setRegisterLoading,
  setCheckLogin,
  setCheckLoginLoading,
  setForgotLoading
} = userSlice.actions;
