import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { MutateUser } from "./contract";
import { Users } from "./contract/Users";

const changePasswordSchema = z.object({
  old_password: z.string(),
  new_password: z.string(),
});
type ChangePassword = z.infer<typeof changePasswordSchema>;

export const changePassword = async (data: ChangePassword) => {
  const sendData: MutateUser = {
    change_password: { old: data.old_password, new: data.new_password },
  };
  const response = await Users.put_self()
    .send(sendData)
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
