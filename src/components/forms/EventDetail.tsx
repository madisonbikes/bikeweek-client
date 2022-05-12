import { Button, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../../api/events";
import { FormTextField } from "../input/FormTextField";
import { BikeWeekEvent, useAuth } from "../../common";
import { Box } from "@mui/system";

type FormData = BikeWeekEvent;

const buildDefaultValues = (
  event: BikeWeekEvent | undefined
): Partial<FormData> => {
  return {
    id: event?.id ?? 0,
    name: event?.name ?? "",
    eventUrl: event?.eventUrl ?? "",
    description: event?.description ?? "",
    eventGraphicUrl: event?.eventGraphicUrl ?? "",
    sponsors: event?.sponsors ?? [],
  };
};

export const EventDetail = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("requires id param");
  }

  const navigate = useNavigate();
  const auth = useAuth();
  const queryClient = useQueryClient();
  const eventQuery = useQuery<BikeWeekEvent, Error>(["events", id], () => {
    return getEvent(auth, id);
  });
  const { data, isSuccess: querySuccess } = eventQuery;

  const eventMutation = useMutation<BikeWeekEvent, Error, FormData>(
    async (data) => {
      return updateEvent(auth, id, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
      },
    }
  );
  const { isSuccess: mutationSuccess } = eventMutation;

  const form = useForm<FormData>({ defaultValues: buildDefaultValues(data) });
  const { formState, handleSubmit, control, reset } = form;
  const { isSubmitting } = formState;

  const {
    fields: sponsorFields,
    append: sponsorFieldAppend,
    remove: sponsorFieldRemove,
  } = useFieldArray({
    control,
    name: "sponsors",
  });

  useEffect(() => {
    if (mutationSuccess) {
      navigate("/events");
    }
  }, [mutationSuccess, navigate]);

  useEffect(() => {
    if (querySuccess) {
      reset(buildDefaultValues(data));
    }
  }, [querySuccess, reset, data]);

  if (eventQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (eventQuery.isError) {
    return <div>Error: {eventQuery.error.message}</div>;
  }

  if (isSubmitting || eventMutation.isLoading) {
    return <div>Updating event...</div>;
  }

  if (!data) {
    throw new Error("data not loaded");
  }
  console.log(`Loaded ${JSON.stringify(data, null, "  ")}`);

  return (
    <div>
      <form>
        <Stack>
          <FormTextField
            name="name"
            fullWidth
            margin="normal"
            label="Event Name"
            required
            control={control}
          />
          <FormTextField
            name="eventUrl"
            fullWidth
            margin="normal"
            label="Event URL"
            control={control}
          />
          <FormTextField
            name="description"
            fullWidth
            multiline
            required
            minRows={2}
            maxRows={10}
            margin="normal"
            label="Description"
            control={control}
          />
          <FormTextField
            name="eventGraphicUrl"
            fullWidth
            multiline
            margin="normal"
            label="Event Graphic URL"
            control={control}
          />
          {sponsorFields.map((item, index) => (
            <>
              <Box display="flex" alignItems="center">
                <FormTextField
                  name={`sponsors.${index}.name`}
                  margin="normal"
                  label="Sponsor Name"
                  control={control}
                />
                <FormTextField
                  sx={{ marginLeft: 1, flex: 1 }}
                  name={`sponsors.${index}.url`}
                  margin="normal"
                  label="Sponsor URL"
                  control={control}
                />
                <Button type="button" onClick={() => sponsorFieldRemove(index)}>
                  Delete
                </Button>
              </Box>
            </>
          ))}
          <Button
            type="button"
            onClick={() => sponsorFieldAppend({ name: "", url: "" })}
          >
            Add Sponsor
          </Button>

          <div>
            <Button
              disabled={isSubmitting}
              onClick={handleSubmit((formData) => {
                eventMutation.mutate(formData);
                form.reset(formData);
              })}
              variant="contained"
            >
              Save
            </Button>

            <Button
              style={{ marginLeft: "1em" }}
              disabled={isSubmitting}
              onClick={() => {
                navigate("/events");
              }}
              variant="contained"
            >
              Close
            </Button>
          </div>
        </Stack>
      </form>
    </div>
  );
};

export default EventDetail;
