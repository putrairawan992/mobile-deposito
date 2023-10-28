import { createSlice } from '@reduxjs/toolkit';

interface User {
    "status": string
    "message": string
    "token": string
    "token_type": string
    "expires_in": number
    "statuses": {
        "profile": boolean
        "pin": boolean
        "password": boolean
    }
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
  userProfileLoading:boolean;
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
  userProfileLoading:false,
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
    setUserProfileLoading: (state, action) => {
      state.userProfileLoading = action.payload;
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
  setUserProfileLoading,
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
