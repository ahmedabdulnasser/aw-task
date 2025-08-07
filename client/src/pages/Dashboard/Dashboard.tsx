import React from "react";
import { Box, Container } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import ExamsTime from "../../components/dashboard/ExamsTime";
import Announcements from "../../components/dashboard/Announcements";
import WhatsDue from "../../components/dashboard/WhatsDue";

const theme = createTheme({
  palette: {
    background: {
      default: "#f9fafb",
    },
  },
});

const Dashboard: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          minHeight: "100vh",
          bgcolor: "background.default",
          p: { xs: 2, md: 3 },
        }}
      >
        <Container maxWidth="lg">
          {/* Main Content */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <ExamsTime />

            {/* Bottom section with Announcements and What's Due side by side */}
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              <Box sx={{ flex: { md: 2 } }}>
                <Announcements />
              </Box>
              <Box sx={{ flex: { md: 1 } }}>
                <WhatsDue />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
