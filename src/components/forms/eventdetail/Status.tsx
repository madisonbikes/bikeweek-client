import { MenuItem } from "@mui/material";
import { useFormContext } from "react-hook-form";
import FormSelect from "../../input/FormSelect";
import { EventStatusSchema } from "../../../api/event";

const Status = () => {
  const { control } = useFormContext();
  return (
    <FormSelect name="status" control={control}>
      <MenuItem
        key={EventStatusSchema.Values.submitted}
        value={EventStatusSchema.Values.submitted}
      >
        Submitted
      </MenuItem>
      <MenuItem
        key={EventStatusSchema.Values.pending}
        value={EventStatusSchema.Values.pending}
      >
        Pending
      </MenuItem>
      <MenuItem
        key={EventStatusSchema.Values.cancelled}
        value={EventStatusSchema.Values.cancelled}
      >
        Cancelled
      </MenuItem>
      <MenuItem
        key={EventStatusSchema.Values.approved}
        value={EventStatusSchema.Values.approved}
      >
        Approved
      </MenuItem>
    </FormSelect>
  );
};

export default Status;
