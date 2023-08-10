import {createSlice} from '@reduxjs/toolkit';

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
  loginLoading: boolean;
  registerLoading: boolean;
}

const initialState: InitialState = {
  user: null,
  token: null,
  loginLoading: false,
  registerLoading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setLoginLoading: (state, action) => {
      state.loginLoading = action.payload;
    },
    setRegisterLoading: (state, action) => {
      state.registerLoading = action.payload;
    },
  },
});

export default userSlice.reducer;

export const {setUser, setToken, setLoginLoading, setRegisterLoading} =
  userSlice.actions;
