import { TextField, TextFieldProps } from "@mui/material";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  ValidateResult,
} from "react-hook-form";

type Props<T extends FieldValues> = Omit<TextFieldProps, "name"> & {
  name: Path<T>;
  control?: Control<T, unknown>;
  validate?: (value: T) => ValidateResult | Promise<ValidateResult>;
};

/** MUI + react-hook-form component */
export const FormTextField = <T extends FieldValues>({
  name,
  control,
  validate,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      rules={{ validate }}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <TextField
          {...rest}
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
};
