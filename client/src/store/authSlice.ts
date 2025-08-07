import { createSlice } from "@reduxjs/toolkit";

export interface AuthState {
  isLoggedIn: boolean;
}

// Default fallback state
const defaultState: AuthState = { isLoggedIn: false };

// Check localStorage for existing auth state
const getInitialAuthState = (): AuthState => {
  try {
    const savedAuthState = localStorage.getItem("authState");
    if (savedAuthState) {
      const parsed = JSON.parse(savedAuthState);
      // Validate the parsed state has the correct structure
      if (
        typeof parsed === "object" &&
        typeof parsed.isLoggedIn === "boolean"
      ) {
        return parsed as AuthState;
      }
    }
  } catch (error) {
    console.error("Error loading auth state from localStorage:", error);
  }
  return defaultState;
};

const initialState: AuthState = getInitialAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.isLoggedIn = true;
      // Save to localStorage
      try {
        localStorage.setItem("authState", JSON.stringify({ isLoggedIn: true }));
      } catch (error) {
        console.error("Error saving auth state to localStorage:", error);
      }
    },
    logout: (state) => {
      state.isLoggedIn = false;
      // Remove from localStorage
      try {
        localStorage.removeItem("authState");
      } catch (error) {
        console.error("Error removing auth state from localStorage:", error);
      }
    },
  },
});

export const { login, logout } = authSlice.actions;

// Export the reducer with explicit typing to handle undefined state
export default authSlice.reducer;
