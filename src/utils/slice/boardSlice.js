import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const SERVER_URL = 'http://localhost:3000';

const initialState = {
    error: '',
    boardData: [],
    errorMessage: '',
    accessToken: '',
    status: '',
};

export const getAllPost = createAsyncThunk('boards/getAll', async (accessToken, thunkAPI) => {
    try {
        const res = await axios.get(`${SERVER_URL}/boards`, {
            headers: {
                authorization: 'Bearer ' + accessToken,
            },
            withCredentials: true,
        });
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            errorMessage: error.response.data.message,
        });
    }
});

export const getPostById = createAsyncThunk('boards/getOne', async (data, thunkAPI) => {
    try {
        const { id, accessToken } = data;
        console.log(typeof id);

        const res = await axios.get(`${SERVER_URL}/boards/${id}}`, {
            headers: {
                authorization: 'Bearer ' + accessToken,
            },
            withCredentials: true,
        });
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            errorMessage: error.response.data.message,
        });
    }
});

export const createPost = createAsyncThunk('boards/post', async (data, thunkAPI) => {
    try {
        const { title, description, accessToken } = data;
        console.log(accessToken);
        const res = await axios.post(
            `${SERVER_URL}/boards`,
            { title, description },
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

export const updatePost = createAsyncThunk('boards/update', async (data, thunkAPI) => {
    try {
        const res = await axios.put(`${SERVER_URL}/boards/:id}`, data, {
            headers: {
                //authorization: 'Bearer ' + accessToken,
            },
            withCredentials: true,
        });
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            errorMessage: error.response.data.message,
        });
    }
});

export const deletePost = createAsyncThunk('boards/delete', async (id, thunkAPI) => {
    try {
        const res = await axios.delete(`${SERVER_URL}/boards/${id}}`, {
            headers: {
                //authorization: 'Bearer ' + accessToken,
            },
            withCredentials: true,
        });
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            errorMessage: error.response.data.message,
        });
    }
});

export const uploadFile = createAsyncThunk('boards/file', async (data, thunkAPI) => {
    try {
        const dataSet = JSON.parse(data.formData.get('data')); // 'data' 키로 추가한 정보를 꺼냅니다
        const { accessToken } = dataSet;

        const res = await axios.post(`${SERVER_URL}/boards/upload`, data, {
            headers: {
                authorization: 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
            },
            withCredentials: true,
        });
        return res;
    } catch (error) {
        return thunkAPI.rejectWithValue({
            errorMessage: error.response.data.message,
        });
    }
});

export const boardSlice = createSlice({
    name: 'board',
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
            // get All Post
            .addCase(getAllPost.pending, (state) => {
                state.status = '';
            })
            .addCase(getAllPost.fulfilled, (state, { payload }) => {
                state.status = 'SUCCESS';
                state.boardData = payload.data;
            })
            .addCase(getAllPost.rejected, (state, { payload }) => {
                state.status = 'ERROR';
            })
            // get Post By Id
            .addCase(getPostById.pending, (state) => {
                state.status = '';
            })
            .addCase(getPostById.fulfilled, (state, { payload }) => {
                state.status = 'SUCCESS';
                state.boardData = payload.data;
            })
            .addCase(getPostById.rejected, (state, { payload }) => {
                console.log(payload);
                state.status = 'ERROR';
            })
            // create Post
            .addCase(createPost.pending, (state) => {
                state.status = '';
            })
            .addCase(createPost.fulfilled, (state, { payload }) => {
                state.status = 'SUCCESS';
            })
            .addCase(createPost.rejected, (state, { payload }) => {
                console.log(payload);
                state.status = 'ERROR';
            })
            // update Post
            .addCase(updatePost.pending, (state) => {
                state.status = '';
            })
            .addCase(updatePost.fulfilled, (state, { payload }) => {
                state.status = 'SUCCESS';
            })
            .addCase(updatePost.rejected, (state, { payload }) => {
                state.status = 'ERROR';
            })
            // delete Post
            .addCase(deletePost.pending, (state) => {
                state.status = '';
            })
            .addCase(deletePost.fulfilled, (state, { payload }) => {
                state.status = 'SUCCESS';
            })
            .addCase(deletePost.rejected, (state, { payload }) => {
                state.status = 'ERROR';
            })
            //upload File
            .addCase(uploadFile.pending, (state) => {
                state.status = '';
            })
            .addCase(uploadFile.fulfilled, (state, { payload }) => {
                console.log('승공');
                console.log(payload);
                state.status = 'SUCCESS';
            })
            .addCase(uploadFile.rejected, (state, { payload }) => {
                state.status = 'ERROR';
            });
    },
});
export const selectBoardData = (state) => state.board.boardData;
export default boardSlice.reducer;
