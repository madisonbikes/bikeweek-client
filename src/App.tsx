import { Link } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { useAuth } from "./common/authentication";
import "./styles.css";

const App = () => {
  const auth = useAuth();

  return (
    <>
      <h1>Bike Week</h1>
      <nav>
        <Link component={RouterLink} to="/">
          Home
        </Link>
        &nbsp;|&nbsp;
        {!auth.state.jwt ? (
          <>
            <Link component={RouterLink} to="/login">
              Login
            </Link>
            &nbsp;|&nbsp;
          </>
        ) : null}
        {auth.state.jwt ? (
          <>
            <Link component={RouterLink} to="/logout">
              Logout
            </Link>
            &nbsp;|&nbsp;
          </>
        ) : null}
        <Link component={RouterLink} to="/info">
          Info
        </Link>
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
};

export default App;
