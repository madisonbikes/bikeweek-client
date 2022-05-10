import { useAuth } from "../common/authentication";

const info = () => {
  const auth = useAuth();

  return (
    <main>
      <h2>Session Info</h2>
      {auth.state.jwt ? (
        <>
          <ul>
            <li>Authenticated</li>
            <li>JWT: {auth.state.jwt}</li>
          </ul>
        </>
      ) : (
        <>Unauthenticated</>
      )}
    </main>
  );
};

export default info;
