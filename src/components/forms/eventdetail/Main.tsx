import { Button, Divider, Stack } from "@mui/material";
import { useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../../../api/events";
import FormTextField from "../../input/FormTextField";
import {
  BikeWeekEvent,
  EventDay,
  EventLocation,
  EventSponsor,
  EventStatus,
  EventTime,
  useAuth,
} from "../../../common";
import { Box } from "@mui/system";
import Sponsors from "./Sponsors";
import Location from "./Location";
import Types from "./Types";

type FormData = BikeWeekEvent;

const buildDefaultValues = (
  event: BikeWeekEvent | undefined
): Partial<FormData> => {
  return {
    name: event?.name ?? "",
    eventUrl: event?.eventUrl ?? "",
    description: event?.description ?? "",
    eventGraphicUrl: event?.eventGraphicUrl ?? "",
    sponsors: event?.sponsors ?? [],
    location: event?.location ?? { name: "" },
    eventTypes: event?.eventTypes ?? [],
  };
};

export const MainForm = () => {
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
  //console.log(`Loaded ${JSON.stringify(data, null, "  ")}`);

  return (
    <FormProvider {...form}>
      <form>
        <Stack>
          <h3>Event Info</h3>
          <FormTextField
            name="name"
            fullWidth
            margin="normal"
            label="Name"
            required
            control={control}
          />
          <FormTextField
            name="eventUrl"
            fullWidth
            margin="normal"
            label="URL"
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
          <Sponsors />
          <Divider />
          <Location />
          <Types />
          <Box sx={{ marginTop: 1 }}>
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
          </Box>
        </Stack>
      </form>
    </FormProvider>
  );
};

export default MainForm;
