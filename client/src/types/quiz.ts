import type { BaseEntity } from "./common";

export interface QuizQuestion {
  title: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz extends BaseEntity {
  title: string;
  description: string;
  questions: QuizQuestion[];
  createdBy: string;
}
