import { createSlice } from '@reduxjs/toolkit';


interface InitialState {
    showDashboard: any
    showDashboardLoading: boolean
}

const initialState: InitialState = {
    showDashboard: null,
    showDashboardLoading: false,
};

export const dashboardSlice = createSlice({
    name: 'dashboard',
    initialState,
    reducers: {
        setShowDashboard: (state, action) => {
            state.showDashboard = action.payload;
        },
        setShowDashboardLoading: (state, action) => {
            state.showDashboardLoading = action.payload;
        },

    },
});

export default dashboardSlice.reducer;

export const {
    setShowDashboard, setShowDashboardLoading } = dashboardSlice.actions;
