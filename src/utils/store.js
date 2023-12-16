import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slice/userSlice';
import authReducer from './slice/authSlice';
import boardReducer from './slice/boardSlice';
import commentReducer from './slice/commentSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        board: boardReducer,
        comments: commentReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
