import { useFormContext } from "react-hook-form";
import { FormTextField } from "../../input/FormTextField";

const Location = () => {
  const form = useFormContext<FormData>();
  const { control } = form;

  return (
    <>
      <h3>Event Location</h3>
      <FormTextField
        name="location.name"
        fullWidth
        required
        margin="normal"
        label="Name"
        control={control}
      />
      <FormTextField
        name="location.sched_venue"
        fullWidth
        margin="normal"
        label="Sched venue name override"
        control={control}
      />
      <FormTextField
        name="location.sched_address"
        fullWidth
        margin="normal"
        label="Sched vanue address override"
        control={control}
      />

      <FormTextField
        name="location.maps_description"
        fullWidth
        margin="normal"
        label="Short location description override for inclusion in event"
        control={control}
      />
      <FormTextField
        name="location.maps_query"
        fullWidth
        margin="normal"
        label="Google Maps query name"
        control={control}
      />
      <FormTextField
        name="location.maps_placeid"
        fullWidth
        margin="normal"
        label="Google Maps placeid"
        control={control}
      />
      <FormTextField
        name="location.detailed_location_description"
        fullWidth
        margin="normal"
        label="Organizer-supplied extra location description info (for internal/advisory use only)"
        control={control}
      />
    </>
  );
};

export default Location;
