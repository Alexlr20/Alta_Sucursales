import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
// import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DialogActions,
  DialogContent,
  DialogContentText,
  Grid,
  Icon,
  TextField,
} from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// eslint-disable-next-line react/prop-types
export default function AttachedDialog({ textValue, id }) {
  // eslint-disable-next-line no-console
  console.log(textValue, id);
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
            upload_file
          </Icon>
        </Button>
      </MDBox>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <MDBox display="flex" justifyContent="space-between">
          <DialogTitle>DETALLE INSTRUCCION </DialogTitle>
          <Icon sx={{ marginRight: 1, marginTop: 0.5, cursor: "pointer" }} onClick={handleClose}>
            close
          </Icon>
        </MDBox>
        <MDBox>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <DialogContent>
                <DialogContentText> Archivo </DialogContentText>
                <MDButton
                  color="info"
                  fullWidth
                  sx={{ marginTop: 2 }}
                  variant="contained"
                  component="label"
                >
                  Elegir archivos
                  <input hidden accept="image/* video/* audio/*" multiple type="file" />
                </MDButton>
              </DialogContent>
            </Grid>
            <Grid item xs={6}>
              <DialogContent>
                <DialogContentText> Nombres </DialogContentText>
                <TextField fullWidth sx={{ marginTop: 2 }} />
              </DialogContent>
            </Grid>
          </Grid>
          <DialogActions>
            <MDButton color="info" onClick={handleClose}>
              Guardar
            </MDButton>
          </DialogActions>
        </MDBox>
      </Dialog>
    </div>
  );
}
