import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";
import { Button } from "@mui/material";

const Home = () => {
  const dispatch = useDispatch();
  const handleLogin = () => {
    dispatch(login());
  };

  return (
    <div>
      <h1>Hey there! Please login to proceed. </h1>
      <Button variant="contained" onClick={handleLogin}>
        Login
      </Button>
    </div>
  );
};

export default Home;
