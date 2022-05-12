import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent } from "../../api/events";
import { FormTextField } from "../input/FormTextField";
import { BikeWeekEvent, useAuth } from "../../common";

type FormData = {
  name: string;
};

const buildDefaultValues = (event: BikeWeekEvent | undefined): FormData => {
  return { name: event?.name ?? "" };
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

  return (
    <div>
      <form>
        <div className="formItem">
          <FormTextField
            name="name"
            fullWidth
            margin="normal"
            label="Event Name"
            required
            control={control}
          />
        </div>

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
      </form>
    </div>
  );
};

export default EventDetail;
