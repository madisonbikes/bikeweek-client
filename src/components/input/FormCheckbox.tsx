import { Checkbox, CheckboxProps } from "@mui/material";
import { Control, Controller } from "react-hook-form";

type Props = Omit<CheckboxProps, "name"> & {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control?: Control<any>;
};

/** MUI + react-hook-form component */
const FormCheckbox = ({ name, control, ...rest }: Props) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Checkbox
          {...rest}
          value={value ?? false}
          checked={value ?? false}
          onChange={onChange}
        />
      )}
    />
  );
};

export default FormCheckbox;
