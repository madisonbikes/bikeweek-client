import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import { FormTextField } from "../../input/FormTextField";

export const Times = () => {
  const { fields, append, remove } = useFieldArray({
    name: "eventTimes",
  });

  const emptyTimes = fields.length === 0;

  return (
    <>
      <h3>Event Times</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {emptyTimes ? (
          <li>
            <Box sx={{ padding: 1 }}>No times</Box>
          </li>
        ) : (
          ""
        )}
        {fields.map((_item, index) => (
          <li key={_item.id}>
            <Box display="flex" alignItems="center">
              <FormTextField
                variant="standard"
                name={`eventTimes.${index}.start`}
                margin="normal"
                label="Start Time"
              />
              <FormTextField
                variant="standard"
                sx={{ marginLeft: 1 }}
                name={`eventTimes.${index}.end`}
                margin="normal"
                label="End Time"
              />
              <IconButton
                aria-label="delete"
                sx={{ marginLeft: 0.5 }}
                onClick={() => remove(index)}
              >
                <Delete />
              </IconButton>
            </Box>
          </li>
        ))}
      </ul>
      <Button type="button" onClick={() => append({ start: "", end: "" })}>
        Add Time
      </Button>
    </>
  );
};
