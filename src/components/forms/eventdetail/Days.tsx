import { Delete } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { Controller, useFieldArray } from "react-hook-form";
import { FIRST_DAY, LAST_DAY } from "../../../common/config";

export const Days = () => {
  const { fields, append, remove } = useFieldArray({
    name: "eventDays",
  });

  return (
    <>
      <h3>Event Days</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {fields.map((_item, index) => (
          <li key={_item.id}>
            <Box
              display="flex"
              alignItems="center"
              sx={{ marginTop: "0.5rem" }}
            >
              <Controller
                name={`eventDays.${index}`}
                render={({
                  field: { ref, value, onChange, ...fieldProps },
                }) => (
                  <DatePicker
                    {...fieldProps}
                    inputRef={ref}
                    value={value as Date}
                    minDate={FIRST_DAY}
                    maxDate={LAST_DAY}
                    onChange={(value) => {
                      onChange(value);
                    }}
                    slotProps={{ textField: { variant: "outlined" } }}
                  />
                )}
              />
              <IconButton
                aria-label="delete"
                sx={{ marginLeft: "0.5rem" }}
                onClick={() => {
                  remove(index);
                }}
              >
                <Delete />
              </IconButton>
            </Box>
          </li>
        ))}
      </ul>
      <Button
        variant="outlined"
        onClick={() => {
          append(FIRST_DAY);
        }}
      >
        Add Day
      </Button>
    </>
  );
};
