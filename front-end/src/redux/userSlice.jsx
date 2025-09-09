import { createSlice } from "@reduxjs/toolkit";

// Check if we have saved auth data
const getInitialState = () => {
  const token = localStorage.getItem("token") || sessionStorage.getItem("token");
  const user = localStorage.getItem("user") || sessionStorage.getItem("user");
  
  return {
    currentUser: user ? JSON.parse(user) : null,
    token: token || null,
  };
};

const userSlice = createSlice({
  name: "userElement",
  initialState: getInitialState(),
  reducers: {
    setAuth: (state, action) => {
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
      
      // Save to storage based on remember me
      if (action.payload.rememberMe) {
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      } else {
        sessionStorage.setItem("token", action.payload.token);
        sessionStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;
      
      // Clear from all storage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("user");
    },
  },
});

export const { setAuth, logout } = userSlice.actions;
export default userSlice.reducer;