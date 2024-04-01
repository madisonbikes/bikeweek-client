import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = Omit<TextFieldProps, "name"> & {
  name: Path<T>;
  children: React.ReactNode;
  control?: Control<T, unknown>;
};

/** MUI + react-hook-form component */
export const FormSelect = <T extends FieldValues>({
  name,
  control,
  children,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => (
        <TextField
          {...rest}
          ref={ref}
          select
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          error={!!error}
          helperText={error ? error.message : null}
        >
          {children}
        </TextField>
      )}
    />
  );
};
