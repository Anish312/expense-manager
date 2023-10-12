
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null, // You can initialize the user to null or an empty object
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      console.log("action called", action.payload)
    },
    clearUser: (state) => {
      state.user = null;
    },
  },  
});

export const { setUser, clearUser } = authSlice.actions;
export const selectUser = (state) => state.authSlice.user
export default authSlice.reducer;