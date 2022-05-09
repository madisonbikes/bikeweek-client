import React from "react";
import { useAuth } from "../AuthContext";

export default function logout() {
  const authContext = useAuth();
  function logout() {
    authContext.setState({ jwt: undefined });
  }
  return (
    <main>
      <h2>Logout</h2>
      <button onClick={logout}>Logout</button>
    </main>
  );
}
