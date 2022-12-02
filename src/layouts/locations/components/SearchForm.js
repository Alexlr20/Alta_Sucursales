import { Button, Grid, Icon, InputAdornment, TextField } from "@mui/material";
// import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import LocationForm from "./LocationForm";

// eslint-disable-next-line react/prop-types
export default function SearchForm({ searchInput, handleSearchChange, handleShowAdd }) {
  return (
    <>
      <MDTypography>Buscar Sucursales</MDTypography>
      <Grid container sx={{ paddingTop: 1 }} justifyContent="space-between">
        <Grid item xs={8}>
          <TextField
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Icon>search</Icon>
                </InputAdornment>
              ),
            }}
            value={searchInput}
            onChange={handleSearchChange}
          />
        </Grid>

        <Grid item>
          <Button variant="contained" sx={{ color: "#FFF" }} onClick={handleShowAdd}>
            Agregar
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
