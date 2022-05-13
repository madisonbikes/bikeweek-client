import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { useFieldArray, useFormContext } from "react-hook-form";
import { FormTextField } from "../../input/FormTextField";

const Sponsors = () => {
  const form = useFormContext<FormData>();
  const { control } = form;

  const {
    fields: sponsorFields,
    append: sponsorFieldAppend,
    remove: sponsorFieldRemove,
  } = useFieldArray({
    name: "sponsors",
  });

  const emptySponsors = sponsorFields.length == 0;

  return (
    <>
      <h3>Event Sponsors</h3>
      {emptySponsors ? <Box sx={{ padding: 1 }}>No sponsors</Box> : ""}
      {sponsorFields.map((_item, index) => (
        <>
          <Box id={`${index}`} display="flex" alignItems="center">
            <FormTextField
              sx={{ flex: 1 }}
              name={`sponsors.${index}.name`}
              margin="normal"
              label="Sponsor Name"
              control={control}
            />
            <FormTextField
              sx={{ marginLeft: 1, flex: 3 }}
              name={`sponsors.${index}.url`}
              margin="normal"
              label="Sponsor URL"
              control={control}
            />
            <IconButton
              aria-label="delete"
              sx={{ marginLeft: 0.5 }}
              onClick={() => sponsorFieldRemove(index)}
            >
              <Delete />
            </IconButton>
          </Box>
        </>
      ))}
      <Button
        type="button"
        onClick={() => sponsorFieldAppend({ name: "", url: "" })}
      >
        Add Sponsor
      </Button>
    </>
  );
};

export default Sponsors;
