import { FormTextField } from "../../input/FormTextField";

export const Location = () => {
  return (
    <>
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
      </div>
      <div style={{ marginTop: "1rem" }}>
        Optional: Mostly unnecessary but you can include this to improve Google
        Maps behavior in certain circumstances where the maps query is not
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
