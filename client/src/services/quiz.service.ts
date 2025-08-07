import { apiService } from "./api.service";
import type { Quiz } from "../types/quiz";

export const quizService = {
  async getAllQuizzes(): Promise<Quiz[]> {
    return apiService.get<Quiz[]>("/quizzes");
  },

  async getQuizById(id: string): Promise<Quiz> {
    return apiService.get<Quiz>(`/quizzes/${id}`);
  },

  async createQuiz(
    quiz: Omit<Quiz, "_id" | "createdAt" | "updatedAt" | "__v">
  ): Promise<Quiz> {
    return apiService.post<Quiz>("/quizzes", quiz);
  },

  async updateQuiz(id: string, quiz: Partial<Quiz>): Promise<Quiz> {
    return apiService.put<Quiz>(`/quizzes/${id}`, quiz);
  },

  async deleteQuiz(id: string): Promise<void> {
    return apiService.delete<void>(`/quizzes/${id}`);
  },
};
