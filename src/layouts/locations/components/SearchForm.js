import { Button, Grid, Icon, InputAdornment, TextField } from "@mui/material";
// import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { StatusDropdown } from "layouts/catalogues/Cities/components/StatusDropdown";
import { useState } from "react";

export default function SearchForm({ searchInput, handleSearchChange, handleShowAdd, statusValue, setStatusValue }) {
  return (
    <>
      <MDTypography>Buscar Sucursales</MDTypography>
      <Grid container sx={{ paddingTop: 1, rowGap: 1.5 }} justifyContent="space-between">
        <Grid item xs={12}>
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

        <Grid item xs={6}>
          <StatusDropdown statusValue={statusValue} setStatusValue={setStatusValue}/>
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
