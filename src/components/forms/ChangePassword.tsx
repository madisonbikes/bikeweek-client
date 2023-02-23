import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { changePassword } from "../../api/users";
import { FormTextField } from "../input/FormTextField";

type ChangePasswordFormData = {
  old_password: string;
  new_password: string;
  new_password_duplicate: string;
};

const defaultValues: ChangePasswordFormData = {
  old_password: "",
  new_password: "",
  new_password_duplicate: "",
};

export const ChangePassword = () => {
  const [passwordNotification, setPasswordNotification] = useState("");
  const changePasswordMutation = useMutation({ mutationFn: changePassword });
  const { isSuccess: mutationSuccess, data: changePasswordSuccess } =
    changePasswordMutation;

  const form = useForm({
    defaultValues,
  });
  const { formState, handleSubmit, control, getValues } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    if (mutationSuccess) {
      if (changePasswordSuccess) {
        setPasswordNotification("Successfully changed password.");
        form.reset(defaultValues);
      } else {
        setPasswordNotification("Current password doesn't match.");
      }
    }
  }, [mutationSuccess, changePasswordSuccess, form]);

  const onSubmit = (formData: ChangePasswordFormData) => {
    if (formData.new_password !== formData.new_password_duplicate) {
      return;
    }
    changePasswordMutation.mutate(formData);
    form.reset(formData);
  };

  if (changePasswordMutation.isLoading) {
    return <div>Changing password...</div>;
  }
  return (
    <div>
      <h2>Change Password</h2>
      <form
        onKeyDown={async (e) => {
          if (e.code === "Enter") {
            await handleSubmit(onSubmit)();
          }
        }}
      >
        {passwordNotification ? <h3>{passwordNotification}</h3> : null}
        <Grid
          direction="column"
          container
          rowSpacing={2}
          alignItems="flex-start"
        >
          <Grid item>
            <FormTextField
              name="old_password"
              label="Current Password"
              type="password"
              required
              autoComplete="current-password"
              control={control}
            />
          </Grid>
          <Grid item>
            <FormTextField
              control={control}
              name="new_password"
              label="New Password"
              required
              autoComplete="new-password"
              type="password"
              validate={() => {
                const newPassword = getValues("new_password");
                const newPasswordDuplicate = getValues(
                  "new_password_duplicate"
                );
                if (newPasswordDuplicate !== newPassword) {
                  return "Password Mismatch";
                } else {
                  return true;
                }
              }}
            />
          </Grid>
          <Grid item>
            <FormTextField
              control={control}
              name="new_password_duplicate"
              label="New Password (again)"
              required
              autoComplete="new-password"
              type="password"
              validate={() => {
                const newPassword = getValues("new_password");
                const newPasswordDuplicate = getValues(
                  "new_password_duplicate"
                );
                if (newPasswordDuplicate !== newPassword) {
                  return "Password Mismatch";
                } else {
                  return true;
                }
              }}
            />
          </Grid>
          <Grid item>
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit(onSubmit)}
              variant="contained"
            >
              Change Password
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
