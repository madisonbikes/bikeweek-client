import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../common/authentication";

const logout = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    console.log("clearing jwt");
    authContext.setState({ jwt: undefined });
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

export default logout;
