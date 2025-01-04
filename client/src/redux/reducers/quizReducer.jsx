import { createSlice, current } from '@reduxjs/toolkit'

const quizSlice = createSlice({
  name: 'quiz',
  initialState: {
    loading: false,
    error: null,
    data: {},
    page:1,
    totalPages:1,
    currentPage:1,
    hasMore:true,
    search:null
  },
  reducers: {
    setTotalPage(state,action){
      state.totalPages = action.payload;
    },
    setCurrentPage(state,action){
      state.currentPage = action.payload;
    },
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
      state.data = {...state.data ,[action.payload.key] :action.payload.value}
    },
    quizFailure (state, action) {
      state.loading = false
      state.error = action.payload
    }
  }
})


export default quizSlice.reducer;
export const { quizFailure,setTotalPage , setCurrentPage , setHasMore, quizRequest,quizSuccess , incrementPage } = quizSlice.actions;