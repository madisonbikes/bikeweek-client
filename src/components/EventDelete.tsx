import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useQueryClient, useMutation } from "react-query";
import { deleteEvent } from "../api/events";
import { useAuth } from "../common";

export type Props = {
  id: string | undefined;
  onClose: () => void;
};

const EventDelete = (props: Props) => {
  const auth = useAuth();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation<void, Error, string>(
    async (data) => {
      await deleteEvent(auth, data);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("events");
      },
    }
  );

  const id = props.id;
  if (!id) {
    return <></>;
  }

  const onDeleteAccepted = () => {
    deleteMutation.mutate(id);
    props.onClose();
  };

  return (
    <Dialog
      open={true}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete this event?"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this event? If it still exists in the
          remote forms, it will be resynced within an hour in state
          &quot;submitted&quot;.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button onClick={onDeleteAccepted} autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDelete;
