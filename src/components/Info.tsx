import { useAuth } from "../common";
import { ChangePassword } from "./forms/ChangePassword";

export const Info = () => {
  const auth = useAuth();
  return (
    <div>
      <h2>Session Info</h2>
      {auth.state.authenticated ? (
        <>
          <ul>
            <li>Username: {auth.state.username}</li>
            <li>Roles: {auth.state.roles + ""}</li>
          </ul>
        </>
      ) : (
        <>Unauthenticated</>
      )}

      <ChangePassword />
    </div>
  );
};
