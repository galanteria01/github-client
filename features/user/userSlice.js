import { createSlice } from '@reduxjs/toolkit';

const initialState = {}
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    clearUser: (state) => {
      state.user = {};
    }
  }
})

export const { setUser, clearUser } = userSlice.actions
export const selectUser = (state) => state.user;
export default userSlice.reducer