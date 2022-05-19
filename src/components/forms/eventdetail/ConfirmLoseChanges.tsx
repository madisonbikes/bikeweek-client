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
  onConfirm: () => void;
  onClose: () => void;
};

const ConfirmLoseChanges = (props: Props) => {
  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Please Confirm"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure that you want to cancel? You have made changes that will
          be discarded.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} autoFocus>
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.onConfirm();
            props.onClose();
          }}
        >
          Discard Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmLoseChanges;