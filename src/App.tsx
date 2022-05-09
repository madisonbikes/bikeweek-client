import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./authentication";

function App() {
  const authContext = useAuth();
  return (
    <div>
      <h1>Bike Week</h1>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <Link to="/">Home</Link>&nbsp;|&nbsp;
        <Link to="/login">Login</Link>&nbsp;|&nbsp;
        <Link to="/logout">Logout</Link>&nbsp;|&nbsp;
        <Link to="/info">Info</Link>
      </nav>
      <Outlet />
      <footer>{JSON.stringify(authContext.state)}</footer>
    </div>
  );
}

export default App;
