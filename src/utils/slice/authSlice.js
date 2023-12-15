import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const SERVER_URL = 'http://localhost:3000'; // 이 부분은 서버 URL로 변경해야 합니다.

const initialState = {
    loading: false,
    error: '',
    authData: {},
    errorMessage: '',
    accessToken: '',
    status: '',
};

export const signIn = createAsyncThunk('auth/signin', async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${SERVER_URL}/auth/signin`, data);
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            errorMessage: error.response.data.message,
        });
    }
});

export const signUp = createAsyncThunk('auth/signup', async (data, thunkAPI) => {
    try {
        const res = await axios.post(`${SERVER_URL}/auth/signup`, data);

        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            errorMessage: error.response.data.message,
        });
    }
});

export const getUserInfo = createAsyncThunk('auth/getUserInfo', async (data, thunkAPI) => {
    try {
        const { boardId, userId, content, accessToken } = data;
        console.log(accessToken);
        const res = await axios.post(
            `${SERVER_URL}/auth/test`,
            { boardId, userId, content },
            {
                headers: {
                    authorization: 'Bearer ' + accessToken,
                },
                withCredentials: true,
            }
        );
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            errorMessage: error.response.data.message,
        });
    }
});

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        initStatus: (state) => {
            state.status = '';
        },
        initAccessToken: (state) => {
            state.accessToken = '';
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.status = '';
            })
            .addCase(signIn.fulfilled, (state, { payload }) => {
                state.status = 'SUCCESS';
                state.authData = payload.data;
                state.accessToken = payload.data.accessToken;
            })
            .addCase(signIn.rejected, (state, { payload }) => {
                state.status = 'ERROR';
            })
            .addCase(signUp.pending, (state) => {
                state.status = '';
            })
            .addCase(signUp.fulfilled, (state, { payload }) => {
                state.status = 'SUCCESS';
                state.authData = payload.data;
            })
            .addCase(signUp.rejected, (state, { payload }) => {
                state.status = 'ERROR';
            });
    },
});

export const selectStatus = (state) => state.auth.status;
export const selectAccessToken = (state) => state.auth.accessToken;

export const { initStatus, initAccessToken } = authSlice.actions;

export default authSlice.reducer;
