import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice';
import quizReducer from './reducers/quizReducer';
import pathReducer from './reducers/pathReducer';
const store = configureStore({
    reducer: {
        'auth':userReducer,
        'path':pathReducer,
        'quiz':quizReducer
    }
})

export default store;


