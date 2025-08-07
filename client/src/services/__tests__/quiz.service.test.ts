import { describe, it, expect, beforeEach, vi } from "vitest";
import { quizService } from "../quiz.service";

const mockQuizzes = [
  {
    _id: "1",
    title: "JavaScript Fundamentals",
    description: "Test your knowledge of JavaScript basics",
    questions: [
      {
        title: "What is the correct way to declare a variable in JavaScript?",
        options: [
          "var x = 5;",
          "variable x = 5;",
          "v x = 5;",
          "declare x = 5;",
        ],
        correctAnswer: 0,
      },
    ],
    createdBy: "user1",
    createdAt: "2025-08-07T10:00:00.000Z",
    updatedAt: "2025-08-07T10:00:00.000Z",
    __v: 0,
  },
];

describe("quizService", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("should fetch all quizzes", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuizzes,
    });

    const result = await quizService.getAllQuizzes();
    expect(result).toEqual(mockQuizzes);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/quizzes", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
  });

  it("should handle fetch errors", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: false,
      status: 500,
      statusText: "Internal Server Error",
      json: async () => ({ message: "Server error" }),
    });

    await expect(quizService.getAllQuizzes()).rejects.toThrow("Server error");
  });

  it("should fetch quiz by id", async () => {
    const mockQuiz = mockQuizzes[0];
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => mockQuiz,
    });

    const result = await quizService.getQuizById("1");
    expect(result).toEqual(mockQuiz);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/quizzes/1", {
      headers: { "Content-Type": "application/json" },
      method: "GET",
    });
  });

  it("should create quiz", async () => {
    const newQuiz = {
      title: "React Fundamentals",
      description: "Test your React knowledge",
      questions: [
        {
          title: "What is JSX?",
          options: [
            "A JavaScript extension",
            "A CSS framework",
            "A database",
            "A server",
          ],
          correctAnswer: 0,
        },
      ],
      createdBy: "user1",
    };
    const createdQuiz = {
      ...newQuiz,
      _id: "2",
      createdAt: "2025-08-07T10:00:00.000Z",
      updatedAt: "2025-08-07T10:00:00.000Z",
      __v: 0,
    };

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => createdQuiz,
    });

    const result = await quizService.createQuiz(newQuiz);
    expect(result).toEqual(createdQuiz);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/quizzes", {
      headers: { "Content-Type": "application/json" },
      method: "POST",
      body: JSON.stringify(newQuiz),
    });
  });

  it("should update quiz", async () => {
    const updateData = { title: "Updated Quiz Title" };
    const updatedQuiz = { ...mockQuizzes[0], ...updateData };

    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => updatedQuiz,
    });

    const result = await quizService.updateQuiz("1", updateData);
    expect(result).toEqual(updatedQuiz);
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/quizzes/1", {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  });

  it("should delete quiz", async () => {
    globalThis.fetch = vi.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({}),
    });

    await quizService.deleteQuiz("1");
    expect(fetch).toHaveBeenCalledWith("http://localhost:3000/api/quizzes/1", {
      headers: { "Content-Type": "application/json" },
      method: "DELETE",
    });
  });
});
