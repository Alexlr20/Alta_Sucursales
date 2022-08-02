import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon, IconButton, InputAdornment } from "@mui/material";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

// eslint-disable-next-line react/prop-types
export default function NotesDialog({ textValue, id }) {
  // eslint-disable-next-line no-console
  console.log(textValue, id);
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  return (
    <div>
      <MDBox lineHeight={1} textAlign="left" sx={{ marginLeft: -1.5 }}>
        <Button onClick={handleClickOpen("paper")}>
          <Icon fontSize="small" color="info">
            description
          </Icon>
        </Button>
      </MDBox>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <MDBox display="flex" justifyContent="flex-end" sx={{ marginRight: 1, marginTop: 0.5 }}>
          <Icon sx={{ cursor: "pointer" }} onClick={handleClose}>
            close
          </Icon>
        </MDBox>
        <MDBox sx={{ marginTop: -2 }}>
          <DialogTitle id="scroll-dialog-title">
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            />
            DETALLE INSTRUCCION
            <TextField
              fullWidth
              multiline
              rows={4}
              defaultValue="Fecha,  Hora,  Usuario"
              sx={{ marginTop: 2 }}
            />
          </DialogTitle>
        </MDBox>

        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef}>
            <MDBox>
              {[...new Array(50)].map(() => (
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  defaultValue="Fecha,  Hora,  Usuario"
                  sx={{ marginBottom: 2 }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" sx={{ marginBottom: 10, marginRight: -1 }}>
                        <IconButton onClick={handleClose}>
                          <Icon fontSize="small">close</Icon>
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              ))}
            </MDBox>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton color="info" sx={{ justifyContent: "flex-end" }}>
            Agregar
          </MDButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}
