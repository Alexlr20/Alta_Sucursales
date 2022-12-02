/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Box, MenuItem, TextField } from "@mui/material";
import MDTypography from "components/MDTypography";

// eslint-disable-next-line import/prefer-default-export
export function StatusDropdown({statusValue, setStatusValue}) {

    const handleChange = ({target}) => {
        console.log(target.value);
        setStatusValue(target.value);
    };

  return (
    <Box style={{display: "flex", width: "70%", alignSelf: "flex-end", gap: "1rem"}}>
      <MDTypography variant="h6" fontWeight="medium">
        Status
      </MDTypography>
      <TextField
        select
        fullWidth
        size="small"
        variant="outlined"
        name="nombre_estado"
        value={statusValue}
        onChange={handleChange}
        // error={stateError}
      >
        <MenuItem key="all" value="all">Todos</MenuItem>
        <MenuItem key="suspended" value="suspended">Suspendidos</MenuItem>
        <MenuItem key="nonSuspended" value="nonSuspended">No suspendidos</MenuItem>
      </TextField>
    </Box>
  );
}
