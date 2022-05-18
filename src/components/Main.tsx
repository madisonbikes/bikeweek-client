import { Link, SvgIcon } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../common";
import Copyright from "./Copyright";
import { ArrowCircleUp } from "@mui/icons-material";

export const Main = () => {
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
            <Link component={RouterLink} to="/events">
              Events
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
        &nbsp;|&nbsp;
        <Link
          rel="noreferrer noopener"
          href="https://www.madisonbikes.org/wp-admin/admin.php?page=gf_entries&id=5"
          target="_blank"
        >
          Gravity Forms
          <SvgIcon fontSize="inherit">
            <ArrowCircleUp />
          </SvgIcon>
        </Link>
        &nbsp;|&nbsp;
        <Link
          rel="noreferrer noopener"
          href="https://madisonbikeweek2022.sched.com/editor/schedule"
          target="_blank"
        >
          Sched
          <SvgIcon fontSize="inherit">
            <ArrowCircleUp />
          </SvgIcon>
        </Link>
        &nbsp;|&nbsp;
        <Link
          rel="noreferrer noopener"
          href="https://madisonbikes.org/events/bikeweek"
          target="_blank"
        >
          Bike Week
          <SvgIcon fontSize="inherit">
            <ArrowCircleUp />
          </SvgIcon>
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
