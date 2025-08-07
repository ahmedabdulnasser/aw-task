import React from "react";
import { Button, Box } from "@mui/material";
import { useTranslation } from "react-i18next";

const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    // Update document direction for RTL support
    document.dir = lng === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lng;
  };

  return (
    <Box sx={{ display: "flex", gap: 0.5 }}>
      <Button
        variant={i18n.language === "en" ? "contained" : "outlined"}
        size="small"
        onClick={() => changeLanguage("en")}
        sx={{
          minWidth: "45px",
          height: "32px",
          fontSize: "0.75rem",
          backgroundColor: i18n.language === "en" ? "#14b8a6" : "transparent",
          borderColor: "#14b8a6",
          color: i18n.language === "en" ? "white" : "#14b8a6",
          "&:hover": {
            backgroundColor: i18n.language === "en" ? "#0d9488" : "#f0fdfa",
            borderColor: "#14b8a6",
          },
        }}
      >
        EN
      </Button>
      <Button
        variant={i18n.language === "ar" ? "contained" : "outlined"}
        size="small"
        onClick={() => changeLanguage("ar")}
        sx={{
          minWidth: "45px",
          height: "32px",
          fontSize: "0.75rem",
          backgroundColor: i18n.language === "ar" ? "#14b8a6" : "transparent",
          borderColor: "#14b8a6",
          color: i18n.language === "ar" ? "white" : "#14b8a6",
          "&:hover": {
            backgroundColor: i18n.language === "ar" ? "#0d9488" : "#f0fdfa",
            borderColor: "#14b8a6",
          },
        }}
      >
        عربي
      </Button>
    </Box>
  );
};

export default LanguageSwitcher;
