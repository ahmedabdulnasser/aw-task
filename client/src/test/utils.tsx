import React from "react";
import type { ReactElement } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { configureStore } from "@reduxjs/toolkit";
import type { RootState } from "../store";
import authReducer from "../store/authSlice";

const theme = createTheme({
  palette: {
    background: {
      default: "#f9fafb",
    },
  },
});

interface ExtendedRenderOptions extends Omit<RenderOptions, "wrapper"> {
  preloadedState?: Partial<RootState>;
  store?: any; // Using any to avoid complex typing issues
}

export function renderWithProviders(
  ui: ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: {
        auth: authReducer as any, 
      },
      preloadedState,
    }),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <Provider store={store}>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </Provider>
    );
  }

  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
}

export * from "@testing-library/react";
