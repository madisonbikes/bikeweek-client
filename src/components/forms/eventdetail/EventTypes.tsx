import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import FormTextField from "../../input/FormTextField";

const Types = () => {
  const { fields, append, remove } = useFieldArray({
    name: "eventTypes",
  });

  const emptyTypes = fields.length === 0;

  return (
    <>
      <h3>Event Types</h3>
      {emptyTypes ? <Box sx={{ padding: 1 }}>No event types</Box> : undefined}
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {fields.map((_item, index) => (
          <li key={_item.id}>
            <Box display="flex" alignItems="center">
              <FormTextField
                variant="standard"
                sx={{ width: "15rem" }}
                name={`eventTypes.${index}`}
              />
              <IconButton
                aria-label="delete"
                sx={{ marginLeft: "0.5rem" }}
                onClick={() => remove(index)}
              >
                <Delete />
              </IconButton>
            </Box>
          </li>
        ))}
      </ul>
      <Button type="button" onClick={() => append("")}>
        Add Type
      </Button>
    </>
  );
};

export default Types;
