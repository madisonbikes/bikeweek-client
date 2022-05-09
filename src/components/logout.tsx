import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication";

export default function logout() {
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
}
