import { Button } from "@mui/material";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/session";
import { useAuth } from "../common";

export const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation(() => {
    console.log("clearing authentication");
    auth.setState({ authenticated: false });
    return logout();
  });

  const { isSuccess, isLoading } = logoutMutation;

  useEffect(() => {
    if (isSuccess) {
      navigate("/");
    }
  }, [navigate, isSuccess]);

  if (isLoading) {
    return <div>Logging out...</div>;
  }

  return (
    <main>
      <h2>Logout</h2>
      <Button
        variant="contained"
        onClick={() => logoutMutation.mutate(undefined)}
      >
        Logout
      </Button>
    </main>
  );
};
