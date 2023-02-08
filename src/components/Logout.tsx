import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../common";

export const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    console.log("clearing jwt");
    auth.setState({ jwt: undefined });
    navigate("/");
  };

  return (
    <main>
      <h2>Logout</h2>
      <Button variant="contained" onClick={() => logout()}>
        Logout
      </Button>
    </main>
  );
};
