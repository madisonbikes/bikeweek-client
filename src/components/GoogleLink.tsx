import { GoogleLogin as GL } from "@react-oauth/google";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getGoogleFederatedId, linkFederatedId } from "../api/federated";
import { useAuth } from "../common";

export const GoogleLink = () => {
  const auth = useAuth();

  const queryClient = useQueryClient();
  const linkMutation = useMutation({
    mutationFn: linkFederatedId,
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["session"] });
    },
  });

  if (getGoogleFederatedId(auth.state)) {
    return <></>;
  }

  return (
    <div>
      <h4>No linked Google account</h4>
      <GL
        theme="filled_black"
        text="signin_with"
        width="200"
        onSuccess={(credentialResponse) => {
          linkMutation.mutate({
            provider: "google",
            validateToken: credentialResponse.credential ?? "",
          });
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};
