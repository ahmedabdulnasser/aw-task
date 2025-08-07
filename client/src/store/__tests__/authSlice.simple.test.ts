import { describe, it, expect } from "vitest";
import authSlice, { login, logout } from "../authSlice";

describe("AuthSlice", () => {
  it("should have initial state", () => {
    const initialState = { isLoggedIn: false };

    expect(initialState.isLoggedIn).toBe(false);
  });

  it("should handle login action", () => {
    const initialState = { isLoggedIn: false };

    const newState = authSlice(initialState, login());

    expect(newState.isLoggedIn).toBe(true);
  });

  it("should handle logout action", () => {
    const loggedInState = { isLoggedIn: true };

    const newState = authSlice(loggedInState, logout());

    expect(newState.isLoggedIn).toBe(false);
  });
});
