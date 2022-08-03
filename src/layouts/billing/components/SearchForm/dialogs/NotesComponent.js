import * as React from "react";
import { TextField, InputAdornment, Icon, IconButton } from "@mui/material";

export default function NotesComponent() {
  const [, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      {[...new Array(5)].map(() => (
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
    </>
  );
}
