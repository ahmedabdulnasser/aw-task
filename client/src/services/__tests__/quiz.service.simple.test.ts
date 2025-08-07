import { describe, it, expect, vi, beforeEach } from "vitest";
import { quizService } from "../quiz.service";

// Mock the API service
vi.mock("../api.service", () => ({
  apiService: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("QuizService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should have getAllQuizzes method", () => {
    expect(typeof quizService.getAllQuizzes).toBe("function");
  });

  it("should have getQuizById method", () => {
    expect(typeof quizService.getQuizById).toBe("function");
  });

  it("should have createQuiz method", () => {
    expect(typeof quizService.createQuiz).toBe("function");
  });

  it("should have updateQuiz method", () => {
    expect(typeof quizService.updateQuiz).toBe("function");
  });

  it("should have deleteQuiz method", () => {
    expect(typeof quizService.deleteQuiz).toBe("function");
  });
});
