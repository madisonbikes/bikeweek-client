import { Button } from "@mui/material";
import { useMutation, useQueryClient } from "react-query";
import {
  getGoogleFederatedId,
  unlinkFederatedIdentity,
} from "../api/federated";
import { useAuth } from "../common";

export const GoogleUnlink = () => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const unlinkMutation = useMutation({
    mutationFn: unlinkFederatedIdentity,
    onSuccess: () => {
      return queryClient.invalidateQueries(["session"]);
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
