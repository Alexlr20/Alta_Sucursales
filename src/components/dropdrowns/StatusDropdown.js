import { Box, MenuItem, TextField } from "@mui/material";
import MDTypography from "components/MDTypography";

// eslint-disable-next-line import/prefer-default-export
export function StatusDropdown({statusValue, setStatusValue}) {

    const handleChange = ({target}) => {
        console.log(target.value);
        setStatusValue(target.value);
    };

  return (
    <Box style={{display: "flex", alignSelf: "flex-end", gap: "1rem"}}>
      <MDTypography variant="h6" fontWeight="medium">
        Status
      </MDTypography>
      <TextField
        style={{width: "8.5rem"}}
        select
        size="small"
        variant="outlined"
        name="status"
        value={statusValue}
        onChange={handleChange}
      >
        <MenuItem key="all" value="all">Todos</MenuItem>
        <MenuItem key="suspended" value="suspended">Suspendidos</MenuItem>
        <MenuItem key="nonSuspended" value="nonSuspended">No suspendidos</MenuItem>
      </TextField>
    </Box>
  );
}
