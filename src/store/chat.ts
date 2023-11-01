import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showKeluhanList: any
    showKeluhanListLoading: boolean,
    showJenisKeluhan: any,
    showJenisKeluhanLoading: boolean,
    showChatKeluan: any,
    showChatKeluanLoading: boolean,
    showPostChatKeluan: any,
    showPostChatKeluanLoading: boolean
}

const initialState: InitialState = {
    showKeluhanList: null,
    showKeluhanListLoading: false,
    showJenisKeluhan: null,
    showJenisKeluhanLoading: false,
    showChatKeluan: null,
    showChatKeluanLoading: false,
    showPostChatKeluan: null,
    showPostChatKeluanLoading: false
};

export const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setShowKeluhanChat: (state, action) => {
            state.showKeluhanList = action.payload;
        },
        setShowKeluhanChatLoading: (state, action) => {
            state.showKeluhanListLoading = action.payload;
        },
        setShowJenisKeluhanChatLoading: (state, action) => {
            state.showJenisKeluhanLoading = action.payload;
        },
        setShowJenisKeluhanChat: (state, action) => {
            state.showJenisKeluhan = action.payload;
        },
        setShowKeluhanChatDetailLoading: (state, action) => {
            state.showChatKeluanLoading = action.payload;
        },
        setShowKeluhanChatDetail: (state, action) => {
            state.showChatKeluan = action.payload;
        },
        setShowPostKeluhanChatDetailLoading: (state, action) => {
            state.showPostChatKeluanLoading = action.payload;
        },
        setShowPostKeluhanChatDetail: (state, action) => {
            state.showPostChatKeluan = action.payload;
        }
    },
});

export default chatSlice.reducer;

export const {
    setShowPostKeluhanChatDetail, setShowPostKeluhanChatDetailLoading,setShowKeluhanChatDetail, setShowKeluhanChatDetailLoading, setShowKeluhanChat, setShowKeluhanChatLoading, 
    setShowJenisKeluhanChat, setShowJenisKeluhanChatLoading } = chatSlice.actions;
