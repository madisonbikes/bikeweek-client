import { useAuth } from "../common";
import { ChangePassword } from "./forms/ChangePassword";
import { Logout } from "./Logout";

export const Profile = () => {
  const auth = useAuth();
  return (
    <div>
      <h2>Session Info</h2>
      {auth.state.authenticated ? (
        <>
          <ul>
            <li>Username: {auth.state.username}</li>
            {auth.state.roles ? (
              <li>Roles: {JSON.stringify(auth.state.roles)}</li>
            ) : null}
            {auth.state.federated ? (
              <li>
                Federated Identities: {JSON.stringify(auth.state.federated)}
              </li>
            ) : null}
          </ul>
        </>
      ) : (
        <>Unauthenticated</>
      )}
      <Logout />
      <ChangePassword />
    </div>
  );
};
