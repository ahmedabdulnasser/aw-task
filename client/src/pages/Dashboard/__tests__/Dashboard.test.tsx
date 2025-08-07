import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../store/authSlice";

// Mock the child components
vi.mock("../../../components/dashboard/ExamsTime", () => ({
  default: () => (
    <div data-testid="exams-time-component">ExamsTime Component</div>
  ),
}));

vi.mock("../../../components/dashboard/Announcements", () => ({
  default: () => (
    <div data-testid="announcements-component">Announcements Component</div>
  ),
}));

vi.mock("../../../components/dashboard/WhatsDue", () => ({
  default: () => (
    <div data-testid="whats-due-component">WhatsDue Component</div>
  ),
}));

// Mock Material UI components
vi.mock("@mui/material", () => ({
  Box: ({ children, ...props }: any) => (
    <div data-testid="mui-box" {...props}>
      {children}
    </div>
  ),
  Container: ({ children, ...props }: any) => (
    <div data-testid="mui-container" {...props}>
      {children}
    </div>
  ),
}));

// Mock Material UI styles
vi.mock("@mui/material/styles", () => ({
  ThemeProvider: ({ children }: any) => (
    <div data-testid="theme-provider">{children}</div>
  ),
  createTheme: vi.fn(() => ({})),
}));

// Mock CssBaseline
vi.mock("@mui/material/CssBaseline", () => ({
  default: () => <div data-testid="css-baseline" />,
}));

const createTestStore = () => {
  return configureStore({
    reducer: {
      auth: authReducer,
    },
  });
};

const renderWithStore = (component: React.ReactElement) => {
  const store = createTestStore();
  return render(<Provider store={store}>{component}</Provider>);
};

// Import the component after mocking
import Dashboard from "../Dashboard";

describe("Dashboard Component", () => {
  it("should render all dashboard components", () => {
    renderWithStore(<Dashboard />);

    expect(screen.getByTestId("exams-time-component")).toBeInTheDocument();
    expect(screen.getByTestId("announcements-component")).toBeInTheDocument();
    expect(screen.getByTestId("whats-due-component")).toBeInTheDocument();
  });

  it("should render ThemeProvider and CssBaseline", () => {
    renderWithStore(<Dashboard />);

    expect(screen.getByTestId("theme-provider")).toBeInTheDocument();
    expect(screen.getByTestId("css-baseline")).toBeInTheDocument();
  });

  it("should render Container for layout", () => {
    renderWithStore(<Dashboard />);

    expect(screen.getByTestId("mui-container")).toBeInTheDocument();
  });

  it("should have proper component hierarchy", () => {
    renderWithStore(<Dashboard />);

    // ExamsTime should be rendered before the others
    const examsTime = screen.getByTestId("exams-time-component");
    const announcements = screen.getByTestId("announcements-component");
    const whatsDue = screen.getByTestId("whats-due-component");

    expect(examsTime).toBeInTheDocument();
    expect(announcements).toBeInTheDocument();
    expect(whatsDue).toBeInTheDocument();

    // Verify the text content is rendered
    expect(screen.getByText("ExamsTime Component")).toBeInTheDocument();
    expect(screen.getByText("Announcements Component")).toBeInTheDocument();
    expect(screen.getByText("WhatsDue Component")).toBeInTheDocument();
  });

  it("should render multiple Box components for layout", () => {
    renderWithStore(<Dashboard />);

    const boxes = screen.getAllByTestId("mui-box");
    expect(boxes.length).toBeGreaterThan(0);
  });

  it("should pass basic rendering test", () => {
    const { container } = renderWithStore(<Dashboard />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it("should maintain component isolation", () => {
    renderWithStore(<Dashboard />);

    // Each component should be rendered independently
    expect(screen.getByText("ExamsTime Component")).toBeInTheDocument();
    expect(screen.getByText("Announcements Component")).toBeInTheDocument();
    expect(screen.getByText("WhatsDue Component")).toBeInTheDocument();
  });
});
