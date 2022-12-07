import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Icon, IconButton } from "@mui/material";
import MDBox from "components/MDBox";
import { makeStyles, createStyles } from "@mui/styles";
import MDButton from "components/MDButton";
import { asMuiTextField } from "../asMuiTextField";
import useForm from "../useForm";
import Note from "./NotesComponent";

const useStyles = makeStyles(() =>
  createStyles({
    dialogPaper: {
      minHeight: "60vh",
      maxHeight: "60vh",
    },
  })
);

// eslint-disable-next-line react/prop-types, no-unused-vars
export default function NotesDialog({ textValue, tableId }) {
  // eslint-disable-next-line no-console
  // console.log(textValue, tableId);

  const initialFieldValues = {
    noteText: "",
  };

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const descriptionElementRef = React.useRef(null);
  const [items, setItems] = React.useState([]);
  const { register, validateForm, values, setValues } = useForm(initialFieldValues);

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const addNote = React.useCallback(() => {
    const currentH = new Date();
    const currentHour = `${currentH.getHours()}:${currentH.getMinutes()}`;
    setItems([
      ...items,
      {
        id: new Date().getTime(),
        text: values.noteText,
        currentDate: new Date().toDateString(),
        currentHour,
      },
    ]);
    setValues(initialFieldValues);
  }, [items, values.noteText]);

  const removeNote = React.useCallback(
    (itemId) => {
      setItems(items.filter(({ id }) => id !== itemId));
    },
    [items]
  );

  const onSubmit = () => {
    if (validateForm()) {
      // Success process
      addNote();
    }
  };

  return (
    <MDBox>
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
        maxWidth="md"
        classes={{ paper: classes.dialogPaper }}
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
              sx={{ marginTop: 2 }}
              {...asMuiTextField(register("noteText")((v) => v.length > 0))}
            />
          </DialogTitle>
        </MDBox>

        <DialogContent dividers={scroll === "paper"}>
          <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef}>
            <MDBox>
              <div>
                {items.map(({ id, text, currentDate, currentHour }) => (
                  <Note
                    key={id}
                    id={id}
                    setNoteValue={text}
                    removeNote={removeNote}
                    currentDate={currentDate}
                    currentHour={currentHour}
                  />
                ))}
              </div>
            </MDBox>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <MDButton color="info" sx={{ justifyContent: "flex-end" }} onClick={onSubmit}>
            Agregar
          </MDButton>
        </DialogActions>
      </Dialog>
    </MDBox>
  );
}
