import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { Controller, useFieldArray } from "react-hook-form";

const Days = () => {
  const { fields, append, remove } = useFieldArray({
    name: "eventDays",
  });

  return (
    <>
      <h3>Event Days</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {fields.map((_item, index) => (
          <>
            <li key={`${index}`}>
              <Box display="flex" alignItems="center">
                <Controller
                  name={`eventDays.${index}`}
                  render={({
                    field: { ref, value, onChange, ...fieldProps },
                  }) => (
                    <DesktopDatePicker
                      {...fieldProps}
                      label="Event Date"
                      inputRef={ref}
                      value={value}
                      onChange={(e) => onChange(e)}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth />
                      )}
                    />
                  )}
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
          </>
        ))}
      </ul>
      <Button type="button" onClick={() => append(new Date("06/05/2022"))}>
        Add Day
      </Button>
    </>
  );
};

export default Days;
