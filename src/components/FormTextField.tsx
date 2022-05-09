import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type Props = Omit<TextFieldProps, "name"> & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

const FormTextField = ({ name, control, ...rest }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          {...rest}
          value={value}
          onChange={onChange}
          error={!!error}
          helperText={error ? error.message : null}
        />
      )}
    />
  );
};

export default FormTextField;
