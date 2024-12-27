import { createSlice } from '@reduxjs/toolkit'
import { getUser } from '../thunks/userThunks'

const userSlice = createSlice({
  initialState: {
    user: null,
    loading: true,
    error: null,
    modal: {
      isOpen: false,
      message: '',
      type: ''
    }
  },
  name: 'user',
  reducers: {
    setModal (state, action) {
      state.modal.open = action.payload.open
      state.modal.content = action.payload.content
      state.modal.type = action.payload.type
    },
    setLoading (state, action) {
      state.loading = action.payload
    },
    loginRequest (state, action) {
      state.loading = true
      state.error = null
    },
    loginSuccess (state, action) {
      state.loading = false
      state.user = action.payload
    },
    loginFailed (state, action) {
      state.loading = false
      state.error = action.payload
    },logoutUser(state){
        state.user = null
    }
  },
  extraReducers: b => {
    b.addCase(getUser.fulfilled, (state, action) => {
      state.loading = false
      state.user = action.payload
      state.error = null
    }).addCase(getUser.rejected, (state, action) => {
      state.loading = false
      state.error = action.error
    })
  }
})

export const { loginSuccess,logoutUser, loginFailed, setLoading,setModal, loginRequest } =
  userSlice.actions
export default userSlice.reducer
