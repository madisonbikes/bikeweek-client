import { Checkbox, CheckboxProps } from "@mui/material";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

type Props<T extends FieldValues> = Omit<CheckboxProps, "name"> & {
  name: Path<T>;
  control?: Control<T, unknown>;
};

/** MUI + react-hook-form component */
export const FormCheckbox = <T extends FieldValues>({
  name,
  control,
  ...rest
}: Props<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, onBlur, value, ref } }) => (
        <Checkbox
          {...rest}
          ref={ref}
          value={value ?? false}
          checked={value ?? false}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
    />
  );
};
