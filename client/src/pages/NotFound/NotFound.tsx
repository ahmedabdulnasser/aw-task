import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  ArrowBack as ArrowBackIcon,
  Construction as ConstructionIcon,
  Rocket as RocketIcon,
} from "@mui/icons-material";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/dashboard");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          textAlign: "center",
          py: 4,
          position: "relative",
        }}
      >
        {/* Animated Construction Icon */}
        <Box
          sx={{
            mb: 4,
            p: 3,
            borderRadius: "50%",
            backgroundColor: "primary.light",
            color: "primary.main",
            animation: "pulse 2s infinite",
            "@keyframes pulse": {
              "0%": { transform: "scale(1)" },
              "50%": { transform: "scale(1.05)" },
              "100%": { transform: "scale(1)" },
            },
          }}
        >
          <ConstructionIcon sx={{ fontSize: "4rem" }} />
        </Box>

        {/* Large 404 with Coming Soon Style */}
        <Typography
          variant="h1"
          sx={{
            fontSize: { xs: "4rem", md: "6rem" },
            fontWeight: "bold",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            lineHeight: 1,
            mb: 2,
          }}
        >
          404
        </Typography>

        {/* Coming Soon Style Heading */}
        <Typography
          variant="h2"
          component="h1"
          sx={{
            fontWeight: 700,
            mb: 2,
            color: "text.primary",
            fontSize: { xs: "1.8rem", md: "2.5rem" },
          }}
        >
          This Page is Under Construction
        </Typography>

        {/* Coming Soon Description Style */}
        <Typography
          variant="body1"
          sx={{
            color: "text.secondary",
            mb: 1,
            maxWidth: "600px",
            fontSize: "1.1rem",
            lineHeight: 1.6,
          }}
        >
          We're building something amazing here!
        </Typography>

        <Typography
          variant="body2"
          sx={{
            color: "text.secondary",
            mb: 4,
            maxWidth: "600px",
            fontSize: "1rem",
            opacity: 0.8,
          }}
        >
          The page you're looking for doesn't exist yet, but we're working on
          it.
        </Typography>

        {/* Features Preview Style */}
        <Box sx={{ mb: 4, maxWidth: "500px" }}>
          <Typography variant="h6" sx={{ mb: 2, color: "text.primary" }}>
            Coming Soon:
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            <Box sx={{ textAlign: "center" }}>
              <RocketIcon
                sx={{ color: "primary.main", mb: 1, fontSize: "2rem" }}
              />
              <Typography variant="body2" color="text.secondary">
                New Features
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <ConstructionIcon
                sx={{ color: "primary.main", mb: 1, fontSize: "2rem" }}
              />
              <Typography variant="body2" color="text.secondary">
                Enhanced UI
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Action Buttons with Coming Soon Style */}
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={handleGoHome}
            size="large"
            sx={{
              minWidth: 180,
              py: 1.5,
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              "&:hover": {
                background: "linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)",
              },
            }}
          >
            Back to Dashboard
          </Button>

          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={handleGoBack}
            size="large"
            sx={{
              minWidth: 140,
              py: 1.5,
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                borderColor: "primary.dark",
                backgroundColor: "primary.light",
              },
            }}
          >
            Go Back
          </Button>
        </Box>

        {/* Decorative Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: "80px",
            height: "80px",
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            borderRadius: "50%",
            opacity: 0.1,
            animation: "float 3s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translateY(0px)" },
              "50%": { transform: "translateY(-20px)" },
            },
          }}
        />

        <Box
          sx={{
            position: "absolute",
            bottom: "20%",
            right: "15%",
            width: "60px",
            height: "60px",
            background: "linear-gradient(135deg, #764ba2 0%, #667eea 100%)",
            borderRadius: "50%",
            opacity: 0.08,
            animation: "float 4s ease-in-out infinite reverse",
          }}
        />

        {/* Main Decorative Background */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              "linear-gradient(135deg, rgba(102, 126, 234, 0.03) 0%, rgba(118, 75, 162, 0.03) 100%)",
            borderRadius: 2,
            zIndex: -1,
          }}
        />
      </Box>
    </Container>
  );
};

export default NotFound;
