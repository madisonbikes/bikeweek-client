import { ChangePassword } from "./forms/ChangePassword";
import { GoogleLink } from "./GoogleLink";
import { GoogleUnlink } from "./GoogleUnlink";
import { Logout } from "./Logout";

export const Profile = () => {
  return (
    <div>
      <ChangePassword />
      <GoogleLink />
      <GoogleUnlink />
      <Logout />
    </div>
  );
};
