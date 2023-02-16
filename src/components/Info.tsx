import { useAuth } from "../common";

export const Info = () => {
  const auth = useAuth();
  return (
    <main>
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
    </main>
  );
};
