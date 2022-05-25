import { AppBar, Button, Divider, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../../../api/events";
import FormTextField from "../../input/FormTextField";
import {
  BikeWeekEvent,
  EventLocation,
  EventStatus,
  useAuth,
} from "../../../common";
import Sponsors from "./Sponsors";
import Location from "./Location";
import Types from "./Types";
import Days from "./Days";
import Times from "./Times";
import Status from "./Status";
import ConfirmLoseChanges from "./ConfirmLoseChanges";
import Description from "./Description";

type LocationFormData = Required<
  Omit<EventLocation, "sched_venue" | "maps_description">
>;

export type EventFormData = Required<
  Omit<BikeWeekEvent, "id" | "modifyDate" | "createDate" | "location"> & {
    location: LocationFormData;
  }
>;

const buildDefaultValues = (
  event: BikeWeekEvent | undefined
): EventFormData => {
  return {
    name: event?.name ?? "",
    eventUrl: event?.eventUrl ?? "",
    description: event?.description ?? "",
    eventGraphicUrl: event?.eventGraphicUrl ?? "",
    sponsors: event?.sponsors ?? [],
    location: buildDefaultLocationValues(event?.location),
    eventTypes: event?.eventTypes ?? [],
    eventDays: event?.eventDays ?? [],
    eventTimes: event?.eventTimes ?? [],
    status: event?.status ?? EventStatus.SUBMITTED,
    comments: event?.comments ?? "",
  };
};

const buildDefaultLocationValues = (
  location: EventLocation | undefined
): LocationFormData => {
  return {
    name: location?.name ?? "",
    sched_address: location?.sched_address ?? "",
    maps_query: location?.maps_query ?? "",
    detailed_location_description:
      location?.detailed_location_description ?? "",
    maps_placeid: location?.maps_placeid ?? "",
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

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const eventMutation = useMutation<BikeWeekEvent, Error, EventFormData>(
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

  const form = useForm<EventFormData>({
    defaultValues: buildDefaultValues(data),
  });
  const { formState, handleSubmit, control, reset } = form;
  const { isSubmitting, isDirty } = formState;

  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  useEffect(() => {
    if (mutationSuccess) {
      navigate("/events");
    }
  }, [mutationSuccess, navigate]);

  useEffect(() => {
    if (querySuccess && !initialLoadComplete) {
      console.log("resetting on querysuccess for initial load");
      reset(buildDefaultValues(data));
      setInitialLoadComplete(true);
    }
  }, [data, reset, querySuccess, initialLoadComplete]);

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
      <ConfirmLoseChanges
        open={showConfirmCancel}
        onClose={() => {
          setShowConfirmCancel(false);
        }}
        onConfirm={() => {
          navigate("/events");
        }}
      />
      <AppBar>
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div">
            Edit Event ID: {id}
          </Typography>

          <Button
            style={{ marginLeft: "5em" }}
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
              if (!isDirty) {
                navigate("/events");
              } else {
                setShowConfirmCancel(true);
              }
            }}
            variant="contained"
          >
            Discard
          </Button>
        </Toolbar>
      </AppBar>
      <form>
        <h3>Event Status and Comments</h3>
        <Status />
        <FormTextField
          name="comments"
          fullWidth
          multiline
          minRows={1}
          margin="normal"
          label="Admin Comments"
          control={control}
        />
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
        <Description />
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
        <Days />
        <Times />
      </form>
    </FormProvider>
  );
};

export default MainForm;
