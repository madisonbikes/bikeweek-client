import { Link } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../common/authentication";
import Copyright from "./Copyright";

const Main = () => {
  const auth = useAuth();

  return (
    <>
      <h1>Bike Week Administration</h1>
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
        <Copyright />
      </footer>
    </>
  );
};

export default Main;
