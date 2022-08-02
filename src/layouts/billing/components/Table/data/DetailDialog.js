/* eslint-disable react/prop-types */
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Icon, Grid, Divider } from "@mui/material";
import MDBox from "components/MDBox";

// eslint-disable-next-line react/prop-types
export default function DetailDialog({
  textValue,
  id,
  fechaInicial,
  fechaFinal,
  horaInicial,
  horaFinal,
}) {
  // eslint-disable-next-line no-console
  console.log(textValue, id, fechaInicial, fechaFinal, horaInicial, horaFinal);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MDBox lineHeight={1} textAlign="left" sx={{ marginLeft: -1 }}>
        <Button onClick={handleClickOpen}>
          <Icon fontSize="small" color="info">
            add_circle
          </Icon>
        </Button>
      </MDBox>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <MDBox display="flex" justifyContent="flex-end">
          <Icon sx={{ marginRight: 1, marginTop: 0.5, cursor: "pointer" }} onClick={handleClose}>
            close
          </Icon>
        </MDBox>
        <MDBox>
          <Grid container>
            <Grid item xs={5}>
              <MDBox>
                <DialogContent>
                  <DialogContentText align="center">Creación</DialogContentText>
                  <DialogContentText align="center">
                    {fechaInicial} {horaInicial}
                  </DialogContentText>
                </DialogContent>
                <DialogContent>
                  <DialogContentText align="center">Terminado</DialogContentText>
                  <DialogContentText align="center">{fechaFinal}</DialogContentText>
                </DialogContent>
              </MDBox>
            </Grid>
            <Grid item xs={1}>
              <Divider orientation="vertical" flexItem fullWidth />
            </Grid>
            <Grid item xs={5}>
              <DialogContent>
                <DialogContentText align="center">Modificacion</DialogContentText>
                <DialogContentText align="center">
                  {fechaInicial} {horaInicial}
                </DialogContentText>
              </DialogContent>
              <DialogContent>
                <DialogContentText align="center">Autorizacion</DialogContentText>
                <DialogContentText align="center">{fechaFinal}</DialogContentText>
              </DialogContent>
            </Grid>
          </Grid>
        </MDBox>
      </Dialog>
    </div>
  );
}
