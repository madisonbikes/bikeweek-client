import { Link } from "@mui/material";

export const Footer = () => {
  return (
    <p>
      Copyright &copy;{" "}
      <Link href="https://madisonbikes.org">Madison Bikes</Link>{" "}
      {new Date().getFullYear()}
    </p>
  );
};
