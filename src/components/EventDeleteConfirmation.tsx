import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

export type Props = {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const EventDeleteConfirmation = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Please confirm"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you want to delete this event? If it still exists in the
          remote forms, it will be resynced within an hour with the
          &quot;submitted&quot; state.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose}>Cancel</Button>
        <Button
          onClick={() => {
            props.onConfirm();
            props.onClose();
          }}
          autoFocus
        >
          Delete Event
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EventDeleteConfirmation;
