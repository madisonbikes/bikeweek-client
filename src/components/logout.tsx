import { useNavigate } from "react-router-dom";
import { useAuth } from "../authentication";

export default function logout() {
  const authContext = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    authContext.setState({ jwt: undefined });
    navigate("/");
  };

  return (
    <main>
      <h2>Logout</h2>
      <button onClick={logout}>Logout</button>
    </main>
  );
}
