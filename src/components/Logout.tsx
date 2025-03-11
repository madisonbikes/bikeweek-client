import { Button } from "@mui/material";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { logout } from "../api/session";
import { useAuth } from "../common";

export const Logout = () => {
  const auth = useAuth();
  const navigate = useNavigate();

  const logoutMutation = useMutation({
    mutationFn: () => {
      console.log("clearing authentication");
      auth.setState({ authenticated: false });
      return logout();
    },
  });

  const { isSuccess, isPending } = logoutMutation;

  useEffect(() => {
    if (isSuccess) {
      void navigate("/");
    }
  }, [navigate, isSuccess]);

  if (!auth.state.authenticated) {
    return null;
  }

  if (isPending) {
    return <div>Logging out...</div>;
  }

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          logoutMutation.mutate(undefined);
        }}
      >
        Logout
      </Button>
    </>
  );
};
