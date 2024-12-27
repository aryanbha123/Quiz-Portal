import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice';
import pathReducer from './reducers/pathReducer';
const store = configureStore({
    reducer: {
        'auth':userReducer,
        'path':pathReducer
    }
})

export default store;


