import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios'
import { BASE_URL } from "../../config";
export const getUser = createAsyncThunk('api/getuser', async (id, thunkAPI) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/v1/auth/profile`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${id}`,
            },
            withCredentials:true
        });
        const data = await response.data;
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
});
