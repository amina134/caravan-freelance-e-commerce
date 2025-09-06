  import { createSlice } from "@reduxjs/toolkit";

  const userSlice = createSlice({
    name: "userElement",
    initialState: {
      currentUser: null,
      token: null,
    },
    reducers: {
      setAuth: (state, action) => {
        state.currentUser = action.payload.currentUser;
        state.token = action.payload.token;
      },
      logout: (state) => {
        state.currentUser = null;
        state.token = null;
      },
    },
  });

  export const { setAuth, logout } = userSlice.actions;
  export default userSlice.reducer;
