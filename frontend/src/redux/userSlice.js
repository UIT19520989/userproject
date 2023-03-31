import { createSlice } from '@reduxjs/toolkit';
const userSlice = createSlice({
    name: 'user',
    initialState: {
        user: {
            allUsers: null,
            isFetching: false,
            error: false,
            userId: null,
        },
        msg: {
            msgState: 0,
            mess: '',
        },
    },
    reducers: {
        getStart: (state) => {
            state.user.isFetching = true;
        },
        getSuccess: (state, action) => {
            state.user.isFetching = false;
            state.user.allUsers = action.payload;
        },
        getFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        },
        deleteStart: (state) => {
            state.user.isFetching = true;
        },
        deleteSuccess: (state, action) => {
            state.user.isFetching = false;
            state.msg.mess = action.payload;
            state.msg.msgState = 'success';
        },
        deleteFailed: (state, action) => {
            state.user.isFetching = false;
            state.user.error = true;
            state.msg.mess = action.payload;
            state.msg.msgState = 'error';
        },
        getUserStart: (state) => {
            state.user.isFetching = true;
        },
        getUserSuccess: (state, action) => {
            state.user.isFetching = false;
            state.user.userId = action.payload;
        },
        getUserFailed: (state) => {
            state.user.isFetching = false;
            state.user.error = true;
        },
        updateStart: (state) => {
            state.user.isFetching = true;
        },
        updateSuccess: (state, action) => {
            state.user.isFetching = false;
            state.msg.mess = action.payload;
            state.msg.msgState = 'success';
        },
        updateFailed: (state, action) => {
            state.user.isFetching = false;
            state.user.error = true;
            state.msg.mess = action.payload;
            state.msg.msgState = 'error';
        },
    },
});

export const {
    getStart,
    getSuccess,
    getFailed,
    deleteStart,
    deleteSuccess,
    deleteFailed,
    getUserStart,
    getUserSuccess,
    getUserFailed,
    updateStart,
    updateSuccess,
    updateFailed,
} = userSlice.actions;
export default userSlice.reducer;
