import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Skeleton,
  Alert,
  Chip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Assignment, AccessTime } from "@mui/icons-material";
import { useQuizzes } from "../../hooks/useQuizzes";
import { useTranslation } from "react-i18next";

const StyledCard = styled(Card)(({ theme }) => ({
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  height: "fit-content",
}));

const QuizCard = styled(Card)(({ theme }) => ({
  border: "1px solid #e5e7eb",
  marginBottom: theme.spacing(2),
  cursor: "pointer",
  transition: "border-color 0.2s",
  "&:hover": {
    borderColor: "#14b8a6",
  },
  "&:last-child": {
    marginBottom: 0,
  },
}));

const WhatsDue: React.FC = () => {
  const { quizzes, loading, error } = useQuizzes();
  const { t } = useTranslation();

  if (loading) {
    return (
      <StyledCard>
        <CardContent>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={2}
          >
            <Typography variant="h6" fontWeight="600">
              {t("dashboard.whatsDue.title")}
            </Typography>
            <Button size="small" sx={{ color: "#14b8a6" }}>
              {t("dashboard.whatsDue.allButton")}
            </Button>
          </Box>

          <Box>
            {[1, 2].map((i) => (
              <Card key={i} sx={{ mb: 2, border: "1px solid #e5e7eb" }}>
                <CardContent>
                  <Skeleton variant="text" width="50%" height={20} />
                  <Skeleton
                    variant="text"
                    width="100%"
                    height={16}
                    sx={{ my: 1 }}
                  />
                  <Skeleton variant="rectangular" width="100%" height={36} />
                </CardContent>
              </Card>
            ))}
          </Box>
        </CardContent>
      </StyledCard>
    );
  }

  if (error) {
    return (
      <StyledCard>
        <CardContent>
          <Alert severity="error">
            {t("dashboard.whatsDue.error")}: {error}
          </Alert>
        </CardContent>
      </StyledCard>
    );
  }

  return (
    <StyledCard>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={2}
        >
          <Typography variant="h6" fontWeight="600">
            {t("dashboard.whatsDue.title")}
          </Typography>
          <Button size="small" sx={{ color: "#14b8a6" }}>
            {t("dashboard.whatsDue.allButton")}
          </Button>
        </Box>

        <Box>
          {quizzes.slice(0, 2).map((quiz) => (
            <QuizCard key={quiz._id}>
              <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                <Box display="flex" alignItems="center" mb={1}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 24,
                      height: 24,
                      bgcolor: "#f0fdfa",
                      borderRadius: 1,
                      mr: 1,
                    }}
                  >
                    <Assignment sx={{ color: "#14b8a6", fontSize: "1rem" }} />
                  </Box>
                  <Typography variant="body1" fontWeight="500">
                    {quiz.title}
                  </Typography>
                </Box>

                <Typography
                  variant="caption"
                  color="text.secondary"
                  display="block"
                  mb={1}
                >
                  {t("dashboard.whatsDue.topic")}: {quiz.description}
                </Typography>

                <Box
                  display="flex"
                  alignItems="center"
                  gap={1}
                  mb={2}
                  flexWrap="wrap"
                >
                  <Chip
                    label={t("dashboard.whatsDue.quiz")}
                    size="small"
                    variant="outlined"
                    sx={{ height: 20, fontSize: "0.7rem" }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    {quiz.questions.length} {t("dashboard.whatsDue.questions")}
                  </Typography>
                  <Box display="flex" alignItems="center" gap={0.5}>
                    <AccessTime
                      sx={{ fontSize: "0.75rem", color: "text.secondary" }}
                    />
                    <Typography variant="caption" color="text.secondary">
                      {t("dashboard.whatsDue.due")}:{" "}
                      {new Date(quiz.createdAt).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>

                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{
                    color: "#14b8a6",
                    borderColor: "#14b8a6",
                    backgroundColor: "#f0fdfa",
                    "&:hover": {
                      backgroundColor: "#ccfbf1",
                      borderColor: "#14b8a6",
                    },
                    textTransform: "none",
                  }}
                >
                  {t("dashboard.whatsDue.startQuizButton")}
                </Button>
              </CardContent>
            </QuizCard>
          ))}
        </Box>
      </CardContent>
    </StyledCard>
  );
};

export default WhatsDue;
