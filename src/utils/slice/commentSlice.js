import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

const SERVER_URL = 'http://localhost:3000';

const initialState = {
    error: '',
    commentsData: [],
    errorMessage: '',
    status: '',
};

export const getAllComments = createAsyncThunk('comments/getAll', async (data, thunkAPI) => {
    try {
        const { accessToken, id } = data;
        const res = await axios.get(`${SERVER_URL}/comments/${id}`, {
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

export const createComment = createAsyncThunk('comments/post', async (data, thunkAPI) => {
    try {
        const { boardId, userId, content, accessToken } = data;
        const create_res = await axios.post(
            `${SERVER_URL}/comments/write`,
            { boardId, userId, content },
            {
                headers: {
                    authorization: 'Bearer ' + accessToken,
                },
                withCredentials: true,
            }
        );

        const res = await axios.get(`${SERVER_URL}/comments/${boardId}`, {
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

export const updateComment = createAsyncThunk('comments/update', async (data, thunkAPI) => {
    try {
        const { accessToken, commentId, content, boardId } = data;
        const updateRes = await axios.patch(
            `${SERVER_URL}/comments/${commentId}`,
            { commentId, content },
            {
                headers: {
                    authorization: 'Bearer ' + accessToken,
                },
                withCredentials: true,
            }
        );

        const res = await axios.get(`${SERVER_URL}/comments/${boardId}`, {
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

export const deleteComment = createAsyncThunk('comments/delete', async (data, thunkAPI) => {
    try {
        console.log(data);
        const { accessToken, id } = data;
        const res = await axios.delete(`${SERVER_URL}/comments/${id}`, {
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

export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        initStatus: (state) => {
            state.status = '';
        },
        initCommentsData: (state) => {
            state.commentsData = [];
        },
    },
    extraReducers: (builder) => {
        builder
            // get All Comments
            .addCase(getAllComments.pending, (state) => {
                state.status = '';
            })
            .addCase(getAllComments.fulfilled, (state, { payload }) => {
                state.status = 'SUCCESS';
                state.commentsData = payload.data;
            })
            .addCase(getAllComments.rejected, (state, { payload }) => {
                state.status = 'ERROR';
            })

            // create Comment
            .addCase(createComment.pending, (state) => {
                state.status = '';
            })
            .addCase(createComment.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.status = 'SUCCESS';
                state.commentsData = payload.data;
            })
            .addCase(createComment.rejected, (state, { payload }) => {
                console.log(payload);
                state.status = 'ERROR';
            })
            // update Comment
            .addCase(updateComment.pending, (state) => {
                state.status = '';
            })
            .addCase(updateComment.fulfilled, (state, { payload }) => {
                state.status = 'SUCCESS';
                state.commentsData = payload.data;
            })
            .addCase(updateComment.rejected, (state, { payload }) => {
                state.status = 'ERROR';
            })
            // delete Comment
            .addCase(deleteComment.pending, (state) => {
                state.status = '';
            })
            .addCase(deleteComment.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.status = 'SUCCESS';
            })
            .addCase(deleteComment.rejected, (state, { payload }) => {
                console.log(payload);
                state.status = 'ERROR';
            });
    },
});

export const selectCommentsData = (state) => state.comments.commentsData;
export const { initCommentsData } = commentSlice.actions;
export default commentSlice.reducer;
