import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useQuizzes } from "../useQuizzes";

// Mock the quiz service directly matching the import path
vi.mock("../../services/quiz.service", () => ({
  quizService: {
    getAllQuizzes: vi.fn(),
  },
}));

describe("useQuizzes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return initial state", async () => {
    const { quizService } = await import("../../services/quiz.service");
    vi.mocked(quizService.getAllQuizzes).mockImplementation(
      () => new Promise(() => {}) // Never resolves
    );

    const { result } = renderHook(() => useQuizzes());

    expect(result.current.quizzes).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("should load quizzes successfully", async () => {
    const mockQuizzes = [
      {
        _id: "1",
        title: "Math Quiz",
        description: "Basic math questions",
        questions: [],
        createdBy: "admin",
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
        __v: 0,
      },
    ];

    const { quizService } = await import("../../services/quiz.service");
    vi.mocked(quizService.getAllQuizzes).mockResolvedValue(mockQuizzes);

    const { result } = renderHook(() => useQuizzes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.quizzes).toEqual(mockQuizzes);
    expect(result.current.error).toBe(null);
  });

  it("should handle errors when loading quizzes", async () => {
    const errorMessage = "Failed to fetch quizzes";
    const { quizService } = await import("../../services/quiz.service");
    vi.mocked(quizService.getAllQuizzes).mockRejectedValue(
      new Error(errorMessage)
    );

    const { result } = renderHook(() => useQuizzes());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.quizzes).toEqual([]);
    expect(result.current.error).toBe(errorMessage);
  });
});
