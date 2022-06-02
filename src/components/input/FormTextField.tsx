import { TextField, TextFieldProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type Props = Omit<TextFieldProps, "name"> & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

/** MUI + react-hook-form component */
const FormTextField = ({ name, control, ...rest }: Props) => {
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

export default FormTextField;
