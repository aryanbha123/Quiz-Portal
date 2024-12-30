import { createSlice } from '@reduxjs/toolkit'

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    loading: false,
    error: null,
    data: [],
    page:1,
    hasMore:true,
    search:null
  },
  reducers: {
    setSearch(state,action){
      state.search = action.payload
    },
    incrementPage(state){
      state.page += 1;
    },
    setHasMore(state){
      state.hasMore = false;
    },
    quizRequest (state) {
      state.loading = true
      state.error = null
    },
    quizSuccess (state, action) {
      state.loading = false
      state.data = [...state.data, ...action.payload]
    },
    quizFailure (state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})


export default quizSlice.reducer;
export const { quizFailure, setHasMore, quizRequest,quizSuccess , incrementPage } = quizSlice.actions;