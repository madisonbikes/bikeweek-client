import { Link, SvgIcon } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router";
import { useAuth } from "../common";
import { Footer } from "./Footer";
import { ArrowCircleUp } from "@mui/icons-material";
import { GF_FORM_ID, SCHED_URI } from "../common/config";

export const Main = () => {
  const auth = useAuth();
  const schedEditUri = `${SCHED_URI}/editor/schedule`;
  const gfFormUri = `https://www.madisonbikes.org/wp-admin/admin.php?page=gf_entries&id=${GF_FORM_ID}`;

  return (
    <>
      <h1>Bike Week Administration</h1>
      <nav>
        <Link component={RouterLink} to="/">
          Home
        </Link>
        &nbsp;|&nbsp;
        {!auth.state.authenticated ? (
          <>
            <Link component={RouterLink} to="/login">
              Login
            </Link>
            &nbsp;|&nbsp;
          </>
        ) : null}
        {auth.state.authenticated ? (
          <>
            <Link component={RouterLink} to="/events">
              Events
            </Link>
            &nbsp;|&nbsp;
          </>
        ) : null}
        <Link component={RouterLink} to="/profile">
          Profile
        </Link>
        &nbsp;|&nbsp;
        <Link component={RouterLink} to="/about">
          About
        </Link>
        &nbsp;|&nbsp;
        <Link rel="noreferrer noopener" href={gfFormUri} target="_blank">
          Gravity Forms
          <SvgIcon fontSize="inherit">
            <ArrowCircleUp />
          </SvgIcon>
        </Link>
        &nbsp;|&nbsp;
        <Link rel="noreferrer noopener" href={schedEditUri} target="_blank">
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
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </>
  );
};
