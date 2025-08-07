import { useEffect, useState } from "react";
import type { Quiz } from "../types";
import { quizService } from "../services/quiz.service";

export const useQuizzes = () => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        const data = await quizService.getAllQuizzes();
        setQuizzes(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch quizzes"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, []);

  return { quizzes, loading, error };
};
