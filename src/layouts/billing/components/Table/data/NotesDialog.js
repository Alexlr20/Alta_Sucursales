import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon, Grid } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// eslint-disable-next-line react/prop-types
export default function NotesDialog({ textValue, id }) {
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
            description
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
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <DialogContent>
                <DialogContentText> Nueva nota </DialogContentText>
                <TextField fullWidth sx={{ marginTop: 2 }} multiline rows={4} value="Nota" />
                <DialogActions>
                  <MDButton color="info" sx={{ justifyContent: "flex-end" }}>
                    Agregar
                  </MDButton>
                </DialogActions>
              </DialogContent>
            </Grid>
            <Grid item xs={12}>
              <DialogContent>
                <TextField fullWidth multiline rows={4} value="Fecha,  Hora,  Usuario" />
              </DialogContent>
              <DialogContent>
                <TextField fullWidth multiline rows={4} value="Fecha,  Hora,  Usuario" />
              </DialogContent>
            </Grid>
          </Grid>
        </MDBox>
      </Dialog>
    </div>
  );
}
