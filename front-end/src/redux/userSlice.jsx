import { createSlice } from '@reduxjs/toolkit';

const getInitialState = () => {
  const token = localStorage.getItem('token') || sessionStorage.getItem('token');
  const user = localStorage.getItem('user') || sessionStorage.getItem('user');

  try {
    return {
      token: token || null,
      currentUser: user ? JSON.parse(user) : null, // Parse user JSON or return null
    };
  } catch (error) {
    console.error('Failed to parse user from storage:', error);
    return {
      token: null,
      currentUser: null, // Fallback to null if parsing fails
    };
  }
};

const userSlice = createSlice({
  name: 'userElement',
  initialState: getInitialState(),
  reducers: {
    setAuth: (state, action) => {
      state.currentUser = action.payload.user; // Always set the new user (remove fallback)
      state.token = action.payload.token;

      // Save to storage based on rememberMe
      if (action.payload.rememberMe) {
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('user', JSON.stringify(action.payload.user));
      } else {
        sessionStorage.setItem('token', action.payload.token);
        sessionStorage.setItem('user', JSON.stringify(action.payload.user));
      }
    },
    logout: (state) => {
      state.currentUser = null;
      state.token = null;

      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const { setAuth, logout, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;