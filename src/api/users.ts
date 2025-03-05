/* eslint-disable @typescript-eslint/no-unsafe-enum-comparison */
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { userSchema } from "./contract";
import { Users } from "./contract/Users";

const _changePasswordSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
});
type ChangePassword = z.infer<typeof _changePasswordSchema>;

export const changePassword = async (data: ChangePassword) => {
  const response = await Users.put_self_password()
    .send(data)
    .ok(
      (res) =>
        res.status === StatusCodes.OK || res.status === StatusCodes.FORBIDDEN,
    );
  if (response.statusCode === StatusCodes.FORBIDDEN) {
    return false;
  } else {
    return true;
  }
};

export const getSelf = async () => {
  const response = await Users.get_self().ok(
    (res) =>
      res.status === StatusCodes.OK || res.status === StatusCodes.UNAUTHORIZED,
  );
  if (response.statusCode === StatusCodes.UNAUTHORIZED) {
    return undefined;
  } else {
    return userSchema.parse(response.body);
  }
};
