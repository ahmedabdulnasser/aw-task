import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../../store/authSlice";

// Mock the useAnnouncements hook instead of the component
vi.mock("../../../hooks/useAnnouncements", () => ({
  useAnnouncements: vi.fn(),
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
  Typography: ({ children, ...props }: any) => (
    <div data-testid="mui-typography" {...props}>
      {children}
    </div>
  ),
  Button: ({ children, ...props }: any) => (
    <button data-testid="mui-button" {...props}>
      {children}
    </button>
  ),
  Avatar: ({ children, ...props }: any) => (
    <div data-testid="mui-avatar" {...props}>
      {children}
    </div>
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
  Divider: (props: any) => <hr data-testid="mui-divider" {...props} />,
}));

// Mock Material UI styled
vi.mock("@mui/material/styles", () => ({
  styled: (component: any) => () => component,
}));

// Mock Material UI icons
vi.mock("@mui/icons-material", () => ({
  Announcement: () => <span data-testid="announcement-icon">📢</span>,
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
import Announcements from "../Announcements";
import { useAnnouncements } from "../../../hooks/useAnnouncements";

describe("Announcements Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should show loading skeleton when loading", () => {
    vi.mocked(useAnnouncements).mockReturnValue({
      announcements: [],
      loading: true,
      error: null,
    });

    renderWithStore(<Announcements />);

    expect(screen.getByText("Announcements")).toBeInTheDocument();
    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getAllByTestId("mui-skeleton")).toHaveLength(9); // 3 items × 3 skeletons each
  });

  it("should show error alert when there is an error", () => {
    vi.mocked(useAnnouncements).mockReturnValue({
      announcements: [],
      loading: false,
      error: "Failed to load announcements",
    });

    renderWithStore(<Announcements />);

    expect(screen.getByTestId("mui-alert")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Error loading announcements: Failed to load announcements"
      )
    ).toBeInTheDocument();
  });

  it("should display announcements when loaded successfully", () => {
    const mockAnnouncements = [
      {
        _id: "1",
        title: "Test Announcement 1",
        content: "This is the first test announcement content",
        createdBy: "admin",
        postedAt: "2024-01-01T00:00:00Z",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        __v: 0,
      },
      {
        _id: "2",
        title: "Test Announcement 2",
        content: "This is the second test announcement content",
        createdBy: "user",
        postedAt: "2024-01-02T00:00:00Z",
        createdAt: "2024-01-02T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
        __v: 0,
      },
    ];

    vi.mocked(useAnnouncements).mockReturnValue({
      announcements: mockAnnouncements,
      loading: false,
      error: null,
    });

    renderWithStore(<Announcements />);

    expect(screen.getByText("Announcements")).toBeInTheDocument();
    expect(screen.getByText("Test Announcement 1")).toBeInTheDocument();
    expect(screen.getByText("Test Announcement 2")).toBeInTheDocument();
    expect(
      screen.getByText("This is the first test announcement content")
    ).toBeInTheDocument();
    expect(
      screen.getByText("This is the second test announcement content")
    ).toBeInTheDocument();
  });

  it("should limit display to 4 announcements", () => {
    const mockAnnouncements = Array.from({ length: 6 }, (_, i) => ({
      _id: `${i + 1}`,
      title: `Announcement ${i + 1}`,
      content: `Content ${i + 1}`,
      createdBy: "admin",
      postedAt: "2024-01-01T00:00:00Z",
      createdAt: "2024-01-01T00:00:00Z",
      updatedAt: "2024-01-01T00:00:00Z",
      __v: 0,
    }));

    vi.mocked(useAnnouncements).mockReturnValue({
      announcements: mockAnnouncements,
      loading: false,
      error: null,
    });

    renderWithStore(<Announcements />);

    // Should only show first 4 announcements
    expect(screen.getByText("Announcement 1")).toBeInTheDocument();
    expect(screen.getByText("Announcement 2")).toBeInTheDocument();
    expect(screen.getByText("Announcement 3")).toBeInTheDocument();
    expect(screen.getByText("Announcement 4")).toBeInTheDocument();
    expect(screen.queryByText("Announcement 5")).not.toBeInTheDocument();
    expect(screen.queryByText("Announcement 6")).not.toBeInTheDocument();
  });

  it("should format dates correctly", () => {
    const mockAnnouncements = [
      {
        _id: "1",
        title: "Date Test Announcement",
        content: "Testing date formatting",
        createdBy: "admin",
        postedAt: "2024-01-15T00:00:00Z",
        createdAt: "2024-01-15T00:00:00Z",
        updatedAt: "2024-01-15T00:00:00Z",
        __v: 0,
      },
    ];

    vi.mocked(useAnnouncements).mockReturnValue({
      announcements: mockAnnouncements,
      loading: false,
      error: null,
    });

    renderWithStore(<Announcements />);

    // The date should be formatted using toLocaleDateString()
    const expectedDate = new Date("2024-01-15T00:00:00Z").toLocaleDateString();
    expect(screen.getByText(expectedDate)).toBeInTheDocument();
  });
});
