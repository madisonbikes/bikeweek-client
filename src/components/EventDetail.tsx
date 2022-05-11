import { Button } from "@mui/material";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { getEvent, updateEvent, UpdateEventRequest } from "../api/events";
import { FormTextField, useAuth } from "../common";
import { BikeWeekEvent } from "../common/event";

type FormData = UpdateEventRequest;

export const EventDetail = () => {
  const { id } = useParams();
  if (!id) {
    throw new Error("requires id param");
  }

  const navigate = useNavigate();
  const auth = useAuth();
  const queryClient = useQueryClient();
  const { isLoading, isError, data, error } = useQuery<BikeWeekEvent, Error>(
    ["events", id],
    () => {
      return getEvent(auth, id);
    }
  );

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

  const defaultValues = {
    name: data?.name ?? "",
  };

  const form = useForm<FormData>();
  const { formState, handleSubmit, control, reset } = form;
  const { isSubmitting } = formState;

  useEffect(() => {
    reset(defaultValues);
  }, [isLoading]);

  useEffect(() => {
    if (eventMutation.isSuccess) {
      navigate("/events");
    }
  }, [eventMutation.isSuccess]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {error.message}</div>;
  }

  if (isSubmitting || eventMutation.isLoading) {
    return <div>Updating event...</div>;
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
