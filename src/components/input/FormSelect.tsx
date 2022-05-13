import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type Props = Omit<TextFieldProps, "name"> & {
  name: string;
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

/** MUI + react-hook-form component */
const FormSelect = ({ name, control, children, ...rest }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...rest}
          select
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
        >
          {children}
        </TextField>
      )}
    />
  );
};

export default FormSelect;
