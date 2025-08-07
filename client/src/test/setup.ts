import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock fetch globally
globalThis.fetch = vi.fn();

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
globalThis.localStorage = localStorageMock as any;

// Mock window.matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Mock all Material-UI components and icons to avoid loading issues
vi.mock("@mui/material", () => ({
  Box: "div",
  Card: "div",
  CardContent: "div",
  Typography: "div",
  CircularProgress: "div",
  Grid: "div",
  Alert: "div",
}));

vi.mock(
  "@mui/icons-material",
  () =>
    new Proxy(
      {},
      {
        get: () => "span",
      }
    )
);
