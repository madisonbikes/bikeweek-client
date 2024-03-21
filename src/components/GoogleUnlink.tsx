import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGoogleFederatedId, unlinkFederatedId } from "../api/federated";
import { useAuth } from "../common";

export const GoogleUnlink = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const unlinkMutation = useMutation({
    mutationFn: unlinkFederatedId,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  const federatedId = getGoogleFederatedId(auth.state);
  if (!federatedId) {
    return <></>;
  }

  return (
    <div>
      <h4>Linked Google account: {federatedId}</h4>
      <Button
        variant="contained"
        onClick={() => unlinkMutation.mutate("google")}
      >
        Unlink
      </Button>
    </div>
  );
};
