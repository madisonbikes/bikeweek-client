import { Button, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
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
  const { formState, handleSubmit, control, setError, clearErrors } = form;
  const { isSubmitting, errors } = formState;

  useEffect(() => {
    if (mutationSuccess) {
      if (changePasswordSuccess) {
        setPasswordNotification("Successfully changed password.");
        form.reset(defaultValues);
      } else {
        setError(
          "old_password",
          {
            type: "custom",
            message: "Current password invalid.",
          },
          { shouldFocus: true },
        );
      }
    }
  }, [mutationSuccess, changePasswordSuccess, form, setError]);

  const onSubmit = (formData: ChangePasswordFormData) => {
    setPasswordNotification("");
    if (formData.new_password !== formData.new_password_duplicate) {
      setError("root.password_error", {
        type: "custom",
        message: "New passwords don't match",
      });
      return;
    } else {
      clearErrors("root.password_error");
    }
    changePasswordMutation.mutate(formData);
    form.reset(formData);
  };

  if (changePasswordMutation.isPending) {
    return <div>Changing password...</div>;
  }
  return (
    <>
      <h2>Change Password</h2>
      <form
        onKeyDown={async (e) => {
          if (e.code === "Enter") {
            await handleSubmit(onSubmit)();
          }
        }}
      >
        {passwordNotification ? (
          <div className="passwordChangeOk">{passwordNotification}</div>
        ) : null}
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
            />
          </Grid>
          <Grid item className="passwordError">
            {errors.root?.password_error?.type !== undefined ? (
              <>{errors.root?.password_error?.message}</>
            ) : null}
            {errors.old_password ? <>{errors.old_password.message}</> : null}
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
    </>
  );
};
