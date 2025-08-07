import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../store/authSlice";

// Mock Material UI components to avoid rendering issues
vi.mock("@mui/material", () => ({
  Box: ({ children, ...props }: any) => (
    <div data-testid="mui-box" {...props}>
      {children}
    </div>
  ),
  Card: ({ children, ...props }: any) => (
    <div data-testid="mui-card" {...props}>
      {children}
    </div>
  ),
  CardContent: ({ children, ...props }: any) => (
    <div data-testid="mui-card-content" {...props}>
      {children}
    </div>
  ),
  Typography: ({ children, variant, ...props }: any) => (
    <div data-testid="mui-typography" data-variant={variant} {...props}>
      {children}
    </div>
  ),
  Button: ({ children, variant, ...props }: any) => (
    <button data-testid="mui-button" data-variant={variant} {...props}>
      {children}
    </button>
  ),
}));

// Mock Material UI styled
vi.mock("@mui/material/styles", () => ({
  styled: (component: any) => () => component,
}));

// Mock Material UI icons
vi.mock("@mui/icons-material", () => ({
  Quiz: () => <span data-testid="quiz-icon">📝</span>,
  School: () => <span data-testid="school-icon">🎓</span>,
  Assignment: () => <span data-testid="assignment-icon">📋</span>,
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
import ExamsTime from "../ExamsTime";

describe("ExamsTime Component", () => {
  it("should render the main heading", () => {
    renderWithStore(<ExamsTime />);

    expect(screen.getByText("EXAMS TIME")).toBeInTheDocument();
  });

  it("should render the motivational text", () => {
    renderWithStore(<ExamsTime />);

    expect(
      screen.getByText(/Here we are. Are you ready to fight?/)
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /Don't worry, we prepared some tips to be ready for your exams/
      )
    ).toBeInTheDocument();
  });

  it("should render the Einstein quote", () => {
    renderWithStore(<ExamsTime />);

    expect(
      screen.getByText(
        '"Nothing happens until something moves." - Albert Einstein'
      )
    ).toBeInTheDocument();
  });

  it("should render the view exams tips button", () => {
    renderWithStore(<ExamsTime />);

    const button = screen.getByText("View exams tips");
    expect(button).toBeInTheDocument();
    expect(button.closest('[data-testid="mui-button"]')).toHaveAttribute(
      "data-variant",
      "contained"
    );
  });

  it("should render the illustration icons", () => {
    renderWithStore(<ExamsTime />);

    expect(screen.getByTestId("quiz-icon")).toBeInTheDocument();
    expect(screen.getByTestId("school-icon")).toBeInTheDocument();
    expect(screen.getByTestId("assignment-icon")).toBeInTheDocument();
  });

  it("should render the card structure", () => {
    renderWithStore(<ExamsTime />);

    expect(screen.getByTestId("mui-card")).toBeInTheDocument();
    expect(screen.getByTestId("mui-card-content")).toBeInTheDocument();
  });

  it("should have proper text hierarchy", () => {
    renderWithStore(<ExamsTime />);

    // Check that different text elements have different variants
    const heading = screen
      .getByText("EXAMS TIME")
      .closest('[data-testid="mui-typography"]');
    expect(heading).toHaveAttribute("data-variant", "h4");

    const bodyText = screen
      .getByText(/Here we are. Are you ready to fight?/)
      .closest('[data-testid="mui-typography"]');
    expect(bodyText).toHaveAttribute("data-variant", "body2");

    const caption = screen
      .getByText(/Nothing happens until something moves/)
      .closest('[data-testid="mui-typography"]');
    expect(caption).toHaveAttribute("data-variant", "caption");
  });
});
