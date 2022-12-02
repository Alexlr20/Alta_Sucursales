import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon } from "@mui/material";
import MDBox from "components/MDBox";

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function StatusDialog({ textValue, id }) {
  // eslint-disable-next-line no-console
  // console.log(textValue, id);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MDBox lineHeight={1} textAlign="left" sx={{ marginLeft: -1.5 }}>
        <Button onClick={handleClickOpen}>
          <Icon fontSize="small" color="info">
            lock
          </Icon>
        </Button>
      </MDBox>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>Im a Status Dialog</DialogContentText>
          <TextField
            autoFocus
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
