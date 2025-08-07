import { describe, it, expect, vi } from "vitest";
import { renderHook } from "@testing-library/react";
import { useQuizzes } from "../useQuizzes";

// Mock the quiz service
vi.mock("../../services/quiz.service", () => ({
  quizService: {
    getAllQuizzes: vi.fn(),
  },
}));

describe("useQuizzes", () => {
  it("should return initial state", () => {
    const { result } = renderHook(() => useQuizzes());

    expect(result.current.quizzes).toEqual([]);
    expect(result.current.loading).toBe(true);
    expect(result.current.error).toBe(null);
  });

  it("should return the expected properties", () => {
    const { result } = renderHook(() => useQuizzes());

    expect(result.current).toHaveProperty("quizzes");
    expect(result.current).toHaveProperty("loading");
    expect(result.current).toHaveProperty("error");
  });
});
