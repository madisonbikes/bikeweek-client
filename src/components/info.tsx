import { useAuth } from "../authentication";

export default function info() {
  const authContext = useAuth();

  return (
    <main>
      <h2>info</h2>
      {authContext.state.jwt ? (
        <>
          <h2>Authenticated</h2>
          JWT: {authContext.state.jwt}
        </>
      ) : (
        <h2>Unauthenticated</h2>
      )}
    </main>
  );
}
