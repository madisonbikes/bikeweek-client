import React from "react";
import { useAuth } from "../AuthContext";

export default function info() {
  const authContext = useAuth();
  let infoBlock;
  if (authContext.state.jwt) {
    infoBlock = <h2>Authenticated</h2>;
  } else {
    infoBlock = <h2>Unauthenticated</h2>;
  }
  return (
    <main>
      <h2>info</h2>
      {infoBlock}
    </main>
  );
}
