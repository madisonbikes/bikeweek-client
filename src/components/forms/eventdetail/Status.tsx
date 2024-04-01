import { MenuItem } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { eventStatusSchema } from "../../../api/contract/types";
import { FormSelect } from "../../input";

export const Status = () => {
  const { control } = useFormContext();
  return (
    <FormSelect name="status" control={control}>
      <MenuItem
        key={eventStatusSchema.Values.submitted}
        value={eventStatusSchema.Values.submitted}
      >
        Submitted
      </MenuItem>
      <MenuItem
        key={eventStatusSchema.Values.pending}
        value={eventStatusSchema.Values.pending}
      >
        Pending
      </MenuItem>
      <MenuItem
        key={eventStatusSchema.Values.cancelled}
        value={eventStatusSchema.Values.cancelled}
      >
        Cancelled
      </MenuItem>
      <MenuItem
        key={eventStatusSchema.Values.approved}
        value={eventStatusSchema.Values.approved}
      >
        Approved
      </MenuItem>
    </FormSelect>
  );
};
