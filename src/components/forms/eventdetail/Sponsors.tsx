import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { useFieldArray } from "react-hook-form";
import FormTextField from "../../input/FormTextField";

const Sponsors = () => {
  const { fields, append, remove } = useFieldArray({
    name: "sponsors",
  });

  const emptySponsors = fields.length == 0;

  return (
    <>
      <h3>Event Sponsors</h3>
      {emptySponsors ? <Box sx={{ padding: 1 }}>No sponsors</Box> : ""}
      {fields.map((_item, index) => (
        <Box key={_item.id} display="flex" alignItems="center">
          <FormTextField
            sx={{ flex: 1 }}
            name={`sponsors.${index}.name`}
            margin="normal"
            label="Sponsor Name"
          />
          <FormTextField
            sx={{ marginLeft: 1, flex: 3 }}
            name={`sponsors.${index}.url`}
            margin="normal"
            label="Sponsor URL"
          />
          <IconButton
            aria-label="delete"
            sx={{ marginLeft: 0.5 }}
            onClick={() => remove(index)}
          >
            <Delete />
          </IconButton>
        </Box>
      ))}
      <Button type="button" onClick={() => append({ name: "", url: "" })}>
        Add Sponsor
      </Button>
    </>
  );
};

export default Sponsors;
