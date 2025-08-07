import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store";
import { useEffect } from "react";
import { login, logout } from "../../store/authSlice";
import { Button, Container, Paper, Typography } from "@mui/material";

const AuthComponent = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [isLoggedIn, navigate]);

  const handleLogin = () => {
    dispatch(login());
  };

  const handleLogout = () => {
    dispatch(logout());
  };

  if (isLoggedIn) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            You are logged in!
          </Typography>
          <Typography variant="body1" sx={{ mb: 3 }}>
            Redirecting to dashboard...
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </Paper>
      </Container>
    );
  }
  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="h4" gutterBottom>
          Welcome to the App
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Please login to access the dashboard
        </Typography>
        <Button variant="contained" size="large" onClick={handleLogin}>
          Login
        </Button>
      </Paper>
    </Container>
  );
};

export default AuthComponent;
