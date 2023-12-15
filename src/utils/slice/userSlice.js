import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwtDecode from 'jwt-decode';

// let SERVER_URL = 'http://127.0.0.1:5001';
// if (Platform.OS === 'android') {
//   SERVER_URL = 'http://10.0.2.2:5001';
// }

let SERVER_URL = 'httplocalhost';

// Define a type for the slice state

// Define the initial state using that type
const initialState = {
    msg: '',
    loading: false,
    error: null,
    userData: {},
    errorMessage: '',
    accessToken: '',
};

export const getUser = createAsyncThunk('user/getUser', async (accessToken, thunkAPI) => {
    // try {
    //     //console.log(accessToken);
    //     // const refreshToken = await AsyncStorage.getItem('refresh-token');
    //     // const user = JSON.parse(JSON.stringify(jwtDecode(refreshToken)));
    //     const { data } = await axios.get(`${SERVER_URL}/user/${user.email}`, {
    //         headers: {
    //             authorization: 'Bearer ' + accessToken,
    //         },
    //         withCredentials: true,
    //     });
    //     console.log(data);
    //     return data;
    //     // setUserName(name);
    // } catch (e) {
    //     return thunkAPI.rejectWithValue({
    //         errorMessage: e.response.data.message,
    //     });
    // }
});

export const userSlice = createSlice({
    // 슬라이스 이름 정의
    name: 'user',
    // 초기 값
    initialState,
    reducers: {
        initErrorMessage: (state) => {
            state.errorMessage = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // 통신 중
            .addCase(getUser.pending, (state) => {
                state.error = null;
                state.loading = true;
            })
            // 통신 성공
            .addCase(getUser.fulfilled, (state, { payload }) => {
                state.error = null;
                state.loading = false;
                state.userData = payload;
                state.msg = 'SUCCESS_GET_USER';
            })
            // 통신 에러
            .addCase(getUser.rejected, (state, { payload }) => {
                state.loading = false;
                state.msg = 'FAILED_GET_USER';
            });
    },
});

// 리듀서 액션
export const { initErrorMessage } = userSlice.actions;

// useS
// export const selectUserData = (state: RootState) => state.user.userData;
// export const selectMsg = (state: RootState) => state.user.msg;
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default userSlice.reducer;
