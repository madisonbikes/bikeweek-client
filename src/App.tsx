import { Link, Outlet } from "react-router-dom";
import { useAuth } from "./authentication";
import "./styles.css";

function App() {
  const auth = useAuth();

  return (
    <>
      <h1>Bike Week</h1>
      <nav>
        <Link to="/">Home</Link>&nbsp;|&nbsp;
        {!auth.state.jwt ? (
          <>
            <Link to="/login">Login</Link>&nbsp;|&nbsp;
          </>
        ) : null}
        {auth.state.jwt ? (
          <>
            <Link to="/logout">Logout</Link>&nbsp;|&nbsp;
          </>
        ) : null}
        <Link to="/info">Info</Link>
      </nav>
      <Outlet />
      <footer>
        <p>
          Copyright &copy; <a href="https://madisonbikes.org">Madison Bikes</a>{" "}
          2022
        </p>
      </footer>
    </>
  );
}

export default App;
