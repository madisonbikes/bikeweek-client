import { EditLocation } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { FormTextField } from "../../input/FormTextField";
import { ChooseLocation, LocationType } from "./ChooseLocation";

const MADISON_LOCATION: LocationType = [43.0730517, -89.40123019999999];

export const Location = () => {
  const { setValue, watch } = useFormContext();

  const [showChooseLocation, setShowChooseLocation] = useState(false);
  const locationQuery = watch("location.maps_query");

  const initialLocation = extractLocationTuple(locationQuery);

  // called by clicking choose location button
  const openChooseLocation = () => {
    setShowChooseLocation(true);
  };

  return (
    <>
      <ChooseLocation
        initialLocation={initialLocation}
        open={showChooseLocation}
        onClose={() => {
          setShowChooseLocation(false);
        }}
        onConfirm={(value) => {
          setValue("location.maps_query", `${value[0]}, ${value[1]}`);
        }}
      />
      <h3>Event Location</h3>
      <FormTextField
        name="location.name"
        fullWidth
        required
        margin="normal"
        label="Name"
      />
      {/*
      Unused in 2022
      <FormTextField
        name="location.sched_venue"
        fullWidth
        margin="normal"
        label="Sched venue name override"
      />
      */}
      <div style={{ marginTop: "1rem" }}>
        Sched requires an actual address, put the closest address you can find
        including city/zip here.
        <FormTextField
          name="location.sched_address"
          fullWidth
          margin="normal"
          label="Sched venue address override"
        />
      </div>
      {/*
      Unused in 2022
      <FormTextField
        name="location.maps_description"
        fullWidth
        margin="normal"
        label="Short location description override for inclusion in event"
      />
      */}
      <div style={{ marginTop: "1rem" }}>
        Optional: If the location name above is not enough to ID the location
        for Google Maps, you can override it here. Include GPS coordinates or a
        detailed maps query string.
        <FormTextField
          name="location.maps_query"
          fullWidth
          margin="normal"
          label="Google Maps query name"
        />
        <Button
          variant="outlined"
          onClick={openChooseLocation}
          startIcon={<EditLocation />}
        >
          Choose Exact Location
        </Button>
      </div>
      <div style={{ marginTop: "1rem" }}>
        Optional: Mostly unnecessary but you can include this to improve Google
        Maps behavior in certain circumstances where the maps query is not
        sufficient.
        <FormTextField
          name="location.maps_placeid"
          fullWidth
          margin="normal"
          label="Google Maps placeid"
        />
      </div>
      <FormTextField
        name="location.detailed_location_description"
        fullWidth
        multiline
        minRows={1}
        maxRows={5}
        margin="normal"
        label="Organizer-supplied extra location description info (for internal/advisory use only)"
      />
    </>
  );
};

const locationRegex = /^\s*([-+\d.]+)\s*,\s*([-+\d.]+)\s*$/;

/** attempts to extract location tuple (lat/lng), or defaults to Madison if can't be matched */
const extractLocationTuple = (locationString: string) => {
  const matched = locationString.match(locationRegex);
  const retval = MADISON_LOCATION;
  console.log(JSON.stringify(matched));
  if (matched != null && matched.length === 3) {
    retval[0] = parseFloat(matched[1]);
    retval[1] = parseFloat(matched[2]);
  }
  return retval;
};
