import { MenuItem } from "@mui/material";
import { useFormContext } from "react-hook-form";
import { EventStatus } from "../../../common";
import FormSelect from "../../input/FormSelect";

const Status = () => {
  const form = useFormContext<FormData>();
  const { control } = form;

  return (
    <FormSelect name="status" control={control}>
      <MenuItem key={EventStatus.SUBMITTED} value={EventStatus.SUBMITTED}>
        Submitted
      </MenuItem>
      <MenuItem key={EventStatus.PENDING} value={EventStatus.PENDING}>
        Pending
      </MenuItem>
      <MenuItem key={EventStatus.CANCELLED} value={EventStatus.CANCELLED}>
        Cancelled
      </MenuItem>
      <MenuItem key={EventStatus.APPROVED} value={EventStatus.APPROVED}>
        Approved
      </MenuItem>
    </FormSelect>
  );
};

export default Status;
