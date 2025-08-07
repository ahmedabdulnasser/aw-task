import React from "react";
import { Box, Typography, Button, Card, CardContent } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Quiz, School, Assignment } from "@mui/icons-material";
import { useTranslation } from "react-i18next";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(3),
  boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
}));

const IllustrationBox = styled(Box)(({ theme }) => ({
  display: "none",
  [theme.breakpoints.up("md")]: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    gap: theme.spacing(1),
  },
}));

const ExamsTime: React.FC = () => {
  const { t } = useTranslation();

  return (
    <StyledCard>
      <CardContent sx={{ p: 3 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box flex={1}>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.primary"
              gutterBottom
            >
              {t("dashboard.examsTime.title")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
              {t("dashboard.examsTime.subtitle")}
            </Typography>
            <Typography variant="caption" color="text.disabled">
              {t("dashboard.examsTime.quote")}
            </Typography>
          </Box>
          <IllustrationBox>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                color: "#14b8a6",
                opacity: 0.7,
              }}
            >
              <Quiz sx={{ fontSize: 40 }} />
              <School sx={{ fontSize: 40 }} />
              <Assignment sx={{ fontSize: 40 }} />
            </Box>
          </IllustrationBox>
        </Box>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#14b8a6",
            "&:hover": { backgroundColor: "#0d9488" },
            textTransform: "none",
          }}
        >
          {t("dashboard.examsTime.viewTipsButton")}
        </Button>
      </CardContent>
    </StyledCard>
  );
};

export default ExamsTime;
