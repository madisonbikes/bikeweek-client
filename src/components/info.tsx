import { useAuth } from "../authentication";

export default function info() {
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
}
