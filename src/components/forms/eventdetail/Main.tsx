import { AppBar, Button, Divider, Toolbar, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router";
import events from "../../../api/events";
import { FormTextField } from "../../input/FormTextField";
import { Sponsors } from "./Sponsors";
import { Location } from "./Location";
import { Types } from "./EventTypes";
import { Days } from "./Days";
import { Times } from "./Times";
import { Status } from "./Status";
import { ConfirmLoseChanges } from "./ConfirmLoseChanges";
import { Description } from "./Description";
import { yupResolver } from "@hookform/resolvers/yup";
import { EventFormData, FormSchema } from "./schema";

export const Form = () => {
  const { id } = useParams();
  if (id === undefined) {
    throw new Error("requires id param");
  }
  const idAsInt = parseInt(id);

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const eventQuery = useQuery({
    queryKey: ["events", idAsInt],
    queryFn: async () => {
      return FormSchema.cast(await events.getEvent(idAsInt));
    },
  });
  const { data, isSuccess: querySuccess } = eventQuery;

  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const eventMutation = useMutation({
    mutationFn: async (data: EventFormData) => {
      await events.updateEvent(idAsInt, data);
    },
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["events"] });
    },
  });
  const { isSuccess: mutationSuccess } = eventMutation;

  const form = useForm({
    defaultValues: FormSchema.cast({}),
    resolver: yupResolver(FormSchema),
  });
  const { formState, handleSubmit, control, reset } = form;
  const { isSubmitting, isDirty, errors } = formState;

  const [showConfirmCancel, setShowConfirmCancel] = useState(false);

  useEffect(() => {
    if (mutationSuccess) {
      void navigate("/events");
    }
  }, [mutationSuccess, navigate]);

  useEffect(() => {
    if (querySuccess && !initialLoadComplete) {
      reset(FormSchema.cast(data, { stripUnknown: true }));
      setInitialLoadComplete(true);
    }
  }, [data, reset, querySuccess, initialLoadComplete]);

  if (eventQuery.isLoading) {
    return <div>Loading...</div>;
  }

  if (isSubmitting || eventMutation.isPending) {
    return <div>Updating event...</div>;
  }

  if (!data) {
    throw new Error("data not loaded");
  }

  return (
    <FormProvider {...form}>
      <ConfirmLoseChanges
        open={showConfirmCancel}
        onClose={() => {
          setShowConfirmCancel(false);
        }}
        onConfirm={() => {
          void navigate("/events");
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
                void navigate("/events");
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
          maxRows={5}
          margin="normal"
          label="Admin Comments"
          control={control}
        />
        <h3>Event Info</h3>
        <FormTextField
          error={errors.name !== undefined}
          helperText={errors.name?.message}
          name="name"
          fullWidth
          margin="normal"
          label="Name"
          required
          control={control}
        />
        <FormTextField
          error={errors.eventUrl !== undefined}
          helperText={errors.eventUrl?.message}
          name="eventUrl"
          fullWidth
          margin="normal"
          label="URL"
          control={control}
        />
        <Description />
        <FormTextField
          error={errors.eventGraphicUrl !== undefined}
          helperText={errors.eventGraphicUrl?.message}
          name="eventGraphicUrl"
          fullWidth
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
