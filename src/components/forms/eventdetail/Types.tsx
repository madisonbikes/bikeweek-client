import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import FormTextField from "../../input/FormTextField";
import { EventFormData } from "./Main";

const Types = () => {
  const form = useFormContext<EventFormData>();
  const { control } = form;

  const { fields, append, remove } = useFieldArray({
    name: "eventTypes",
  });

  return (
    <>
      <h3>Event Types</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {fields.map((_item, index) => (
          <li key={_item.id}>
            <Box display="flex" alignItems="center">
              <FormTextField
                variant="standard"
                sx={{ width: "15rem" }}
                name={`eventTypes.${index}`}
                control={control}
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
