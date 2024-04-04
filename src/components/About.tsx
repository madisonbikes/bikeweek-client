import { useQueryInfo } from "../api/info";
import { useAuth } from "../common";

export const About = () => {
  const auth = useAuth();
  const { data: serverInfo, isLoading } = useQueryInfo();
  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <main>
      <h2>Session Info</h2>
      {auth.state.authenticated ? (
        <>
          <ul>
            <li>Username: {auth.state.username}</li>
            <li>Roles: {auth.state.roles?.toString()}</li>
          </ul>
        </>
      ) : (
        <>Unauthenticated</>
      )}
      <h2>Version Info</h2>
      <ul>
        <li>Client: {__APP_VERSION__}</li>
        <li>Server: {serverInfo?.version} </li>
      </ul>
    </main>
  );
};
