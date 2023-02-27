import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { Users } from "./contract/Users";

const changePasswordSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
});
type ChangePassword = z.infer<typeof changePasswordSchema>;

export const changePassword = async (data: ChangePassword) => {
  const response = await Users.put_self_Password()
    .send(data)
    .ok(
      (res) =>
        res.status === StatusCodes.OK || res.status === StatusCodes.FORBIDDEN
    );
  if (response.statusCode === StatusCodes.FORBIDDEN) {
    return false;
  } else {
    return true;
  }
};
