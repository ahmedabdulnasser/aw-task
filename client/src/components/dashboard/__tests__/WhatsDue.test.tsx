import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../store/authSlice";

// Mock the useQuizzes hook
vi.mock("../../../hooks/useQuizzes", () => ({
  useQuizzes: vi.fn(),
}));

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
  Button: ({ children, variant, size, fullWidth, ...props }: any) => (
    <button
      data-testid="mui-button"
      data-variant={variant}
      data-size={size}
      data-fullwidth={fullWidth}
      {...props}
    >
      {children}
    </button>
  ),
  Skeleton: ({ variant, width, height, ...props }: any) => (
    <div
      data-testid="mui-skeleton"
      data-variant={variant}
      data-width={width}
      data-height={height}
      {...props}
    >
      Loading...
    </div>
  ),
  Alert: ({ children, severity, ...props }: any) => (
    <div data-testid="mui-alert" data-severity={severity} {...props}>
      {children}
    </div>
  ),
  Chip: ({ label, size, ...props }: any) => (
    <span data-testid="mui-chip" data-size={size} {...props}>
      {label}
    </span>
  ),
}));

// Mock Material UI styled
vi.mock("@mui/material/styles", () => ({
  styled: (component: any) => () => component,
}));

// Mock Material UI icons
vi.mock("@mui/icons-material", () => ({
  Assignment: () => <span data-testid="assignment-icon">📋</span>,
  AccessTime: () => <span data-testid="access-time-icon">⏰</span>,
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
import WhatsDue from "../WhatsDue";
import { useQuizzes } from "../../../hooks/useQuizzes";

describe("WhatsDue Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading skeleton when loading", () => {
    vi.mocked(useQuizzes).mockReturnValue({
      quizzes: [],
      loading: true,
      error: null,
    });

    renderWithStore(<WhatsDue />);

    expect(screen.getByText("What's due")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getAllByTestId("mui-skeleton")).toHaveLength(6); // 2 items × 3 skeletons each
  });

  it("should show error alert when there is an error", () => {
    vi.mocked(useQuizzes).mockReturnValue({
      quizzes: [],
      loading: false,
      error: "Failed to load quizzes",
    });

    renderWithStore(<WhatsDue />);

    expect(screen.getByTestId("mui-alert")).toBeInTheDocument();
    expect(
      screen.getByText("Error loading quizzes: Failed to load quizzes")
    ).toBeInTheDocument();
  });

  it("should display quizzes when loaded successfully", () => {
    const mockQuizzes = [
      {
        _id: "1",
        title: "JavaScript Fundamentals",
        description: "Test your knowledge of JavaScript basics",
        questions: [
          {
            title: "Question 1",
            options: ["A", "B", "C", "D"],
            correctAnswer: 0,
          },
          {
            title: "Question 2",
            options: ["A", "B", "C", "D"],
            correctAnswer: 1,
          },
        ],
        createdBy: "admin",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        __v: 0,
      },
      {
        _id: "2",
        title: "React Basics",
        description: "Learn React fundamentals",
        questions: [
          {
            title: "Question 1",
            options: ["A", "B", "C", "D"],
            correctAnswer: 0,
          },
        ],
        createdBy: "admin",
        createdAt: "2024-01-02T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
        __v: 0,
      },
    ];

    vi.mocked(useQuizzes).mockReturnValue({
      quizzes: mockQuizzes,
      loading: false,
      error: null,
    });

    renderWithStore(<WhatsDue />);

    expect(screen.getByText("What's due")).toBeInTheDocument();
    expect(screen.getByText("JavaScript Fundamentals")).toBeInTheDocument();
    expect(screen.getByText("React Basics")).toBeInTheDocument();
    expect(
      screen.getByText(/Test your knowledge of JavaScript basics/)
    ).toBeInTheDocument();
    expect(screen.getByText(/Learn React fundamentals/)).toBeInTheDocument();
  });

  it("should display question counts correctly", () => {
    const mockQuizzes = [
      {
        _id: "1",
        title: "Math Quiz",
        description: "Basic math questions",
        questions: [
          { title: "Q1", options: ["A", "B"], correctAnswer: 0 },
          { title: "Q2", options: ["A", "B"], correctAnswer: 1 },
          { title: "Q3", options: ["A", "B"], correctAnswer: 0 },
        ],
        createdBy: "admin",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        __v: 0,
      },
    ];

    vi.mocked(useQuizzes).mockReturnValue({
      quizzes: mockQuizzes,
      loading: false,
      error: null,
    });

    renderWithStore(<WhatsDue />);

    expect(screen.getByText("3 Questions")).toBeInTheDocument();
  });

  it("should limit display to 2 quizzes", () => {
    const mockQuizzes = Array.from({ length: 5 }, (_, i) => ({
      _id: `${i + 1}`,
      title: `Quiz ${i + 1}`,
      description: `Description ${i + 1}`,
      questions: [{ title: "Q1", options: ["A", "B"], correctAnswer: 0 }],
      createdBy: "admin",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      __v: 0,
    }));

    vi.mocked(useQuizzes).mockReturnValue({
      quizzes: mockQuizzes,
      loading: false,
      error: null,
    });

    renderWithStore(<WhatsDue />);

    // Should only show first 2 quizzes
    expect(screen.getByText("Quiz 1")).toBeInTheDocument();
    expect(screen.getByText("Quiz 2")).toBeInTheDocument();
    expect(screen.queryByText("Quiz 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Quiz 4")).not.toBeInTheDocument();
    expect(screen.queryByText("Quiz 5")).not.toBeInTheDocument();
  });

  it("should format due dates correctly", () => {
    const mockQuizzes = [
      {
        _id: "1",
        title: "Date Test Quiz",
        description: "Testing date formatting",
        questions: [{ title: "Q1", options: ["A", "B"], correctAnswer: 0 }],
        createdBy: "admin",
        createdAt: "2024-01-15T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z",
        __v: 0,
      },
    ];

    vi.mocked(useQuizzes).mockReturnValue({
      quizzes: mockQuizzes,
      loading: false,
      error: null,
    });

    renderWithStore(<WhatsDue />);

    // The date should be formatted using toLocaleDateString()
    const expectedDate = new Date("2024-01-15T00:00:00Z").toLocaleDateString();
    expect(screen.getByText(`Due: ${expectedDate}`)).toBeInTheDocument();
  });

  it("should render Start Quiz buttons", () => {
    const mockQuizzes = [
      {
        _id: "1",
        title: "Quiz 1",
        description: "Description 1",
        questions: [{ title: "Q1", options: ["A", "B"], correctAnswer: 0 }],
        createdBy: "admin",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        __v: 0,
      },
    ];

    vi.mocked(useQuizzes).mockReturnValue({
      quizzes: mockQuizzes,
      loading: false,
      error: null,
    });

    renderWithStore(<WhatsDue />);

    const startButton = screen.getByText("Start Quiz");
    expect(startButton).toBeInTheDocument();
    expect(startButton.closest('[data-testid="mui-button"]')).toHaveAttribute(
      "data-variant",
      "outlined"
    );
    expect(startButton.closest('[data-testid="mui-button"]')).toHaveAttribute(
      "data-fullwidth",
      "true"
    );
  });

  it("should render assignment and time icons", () => {
    const mockQuizzes = [
      {
        _id: "1",
        title: "Quiz 1",
        description: "Description 1",
        questions: [{ title: "Q1", options: ["A", "B"], correctAnswer: 0 }],
        createdBy: "admin",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        __v: 0,
      },
    ];

    vi.mocked(useQuizzes).mockReturnValue({
      quizzes: mockQuizzes,
      loading: false,
      error: null,
    });

    renderWithStore(<WhatsDue />);

    expect(screen.getByTestId("assignment-icon")).toBeInTheDocument();
    expect(screen.getByTestId("access-time-icon")).toBeInTheDocument();
  });
});
