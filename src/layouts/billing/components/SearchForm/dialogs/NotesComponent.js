import * as React from "react";
import { TextField, InputAdornment, IconButton, Icon } from "@mui/material";

// eslint-disable-next-line react/prop-types
export default function Note({ id, removeNote, setNoteValue, currentDate, currentHour }) {
  const clickHandler = React.useCallback(() => {
    removeNote(id);
  }, [id, removeNote]);

  return (
    <div>
      <TextField
        fullWidth
        sx={{ marginBottom: 2 }}
        value={setNoteValue}
        label={`Nombre, ${currentHour} , ${currentDate}`}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end" sx={{ marginBottom: 1, marginRight: -1 }}>
              <IconButton onClick={clickHandler}>
                <Icon fontSize="small">close</Icon>
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
}
