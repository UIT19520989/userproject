import axios from 'axios';
import {
    loginFailed,
    loginStart,
    loginSuccess,
    logoutFailed,
    logoutStart,
    logoutSuccess,
    registerFailed,
    registerStart,
    registerSuccess,
} from './authSlice';
import { BASE_URL_AUTH, BASE_URL_USER } from '../utils/api';
import {
    deleteFailed,
    deleteStart,
    deleteSuccess,
    getFailed,
    getStart,
    getSuccess,
    getUserFailed,
    getUserStart,
    getUserSuccess,
    updateFailed,
    updateStart,
    updateSuccess,
} from './userSlice';
import { headers } from '~/utils/headers';

export const loginUser = (user, navigate) => async (dispatch) => {
    dispatch(loginStart());
    try {
        const res = await axios.post(`${BASE_URL_AUTH}/login`, user);
        await localStorage.setItem('accessToken', res.data?.accessToken);
        await localStorage.setItem('isAdmin', res.data?.isAdmin);
        await localStorage.setItem('id', res.data?._id);
        dispatch(loginSuccess(res.data));
        res.data?.isAdmin ? navigate('/') : navigate('/profile');
    } catch (error) {
        dispatch(loginFailed());
    }
};

export const registerUser = (user, navigate) => async (dispatch) => {
    dispatch(registerStart());
    try {
        await axios.post(`${BASE_URL_AUTH}/register`, user);
        dispatch(registerSuccess());
        navigate('/signin');
    } catch (error) {
        dispatch(registerFailed());
    }
};

export const getAllUsers = async (dispatch) => {
    dispatch(getStart());
    const token = await localStorage.getItem('accessToken');
    const headers = {
        token: `Bearer ${token}`,
    };
    try {
        const res = await axios.get(`${BASE_URL_USER}`, {
            headers,
        });
        dispatch(getSuccess(res.data));
    } catch (error) {
        dispatch(getFailed());
    }
};

export const deleteUser = async (dispatch, id) => {
    dispatch(deleteStart());
    try {
        const res = await axios.delete(`${BASE_URL_USER}/${id}/delete`, {
            headers,
        });
        dispatch(deleteSuccess(res.data));
        localStorage.setItem('state', 'success');
    } catch (error) {
        dispatch(deleteFailed(error.response.data));
        localStorage.setItem('state', 'error');
    }
};

export const logoutUser = async (dispatch, _id) => {
    dispatch(logoutStart());
    try {
        await axios.post(`${BASE_URL_AUTH}/logout`, _id, {
            headers,
        });
        dispatch(getUserSuccess(null));
        dispatch(logoutSuccess());
        localStorage.clear();
    } catch (error) {
        dispatch(logoutFailed());
    }
};

export const getUserById = async (dispatch, id) => {
    dispatch(getUserStart());
    const token = await localStorage.getItem('accessToken');
    const headers = {
        token: `Bearer ${token}`,
    };
    try {
        const res = await axios.get(`${BASE_URL_USER}/${id}`, {
            headers,
        });
        dispatch(getUserSuccess(res.data));
    } catch (error) {
        dispatch(getUserFailed());
    }
};

export const updateUser = async (dispatch, id, newData) => {
    dispatch(updateStart());
    try {
        const res = await axios.put(`${BASE_URL_USER}/${id}/update`, newData, {
            headers,
        });
        dispatch(updateSuccess(res.data, ''));
        localStorage.setItem('state', 'success');
    } catch (error) {
        dispatch(updateFailed(error.response.data));
        localStorage.setItem('state', 'error');
    }
};
