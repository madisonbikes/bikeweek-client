import { Link } from "@mui/material";

export const Footer = () => {
  return (
    <p>
      <Link href="https://github.com/madisonbikes/bikeweek-client">
        r{__APP_VERSION__}
      </Link>{" "}
      &nbsp;|&nbsp; Copyright &copy;{" "}
      <Link href="https://madisonbikes.org">Madison Bikes</Link>{" "}
      {new Date().getFullYear()}
    </p>
  );
};
