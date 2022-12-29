import { Box, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";

export function CityDropdown({cityValue, setCityValue}) {

    const [allListedCities, setAllListedCities] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php')
            .then((response) => {
                const { data } = response;
                const { ciudad } = data;
                setAllListedCities(ciudad);
            })
            .catch((error) => {
                if (error === 'AbortError') console.log(error);
            });
        return () => abortCont.abort();
    }, []);


    const handleChange = ({target}) => setCityValue(target.value);

  return (
    <Box style={{display: "flex", width: "70%", alignSelf: "flex-end", gap: "1rem"}}>
      <MDTypography variant="h6" fontWeight="medium">
        Ciudad
      </MDTypography>
      <TextField
        select
        fullWidth
        size="small"
        variant="outlined"
        name="cityValue"
        value={cityValue}
        onChange={handleChange}
        // error={stateError}
      >
        <MenuItem key='all' value='all' selected>Todas</MenuItem>
        {
            allListedCities && allListedCities?.map(city => <MenuItem key={city.id} value={city.id}>{city.nombre}</MenuItem>)
        }
      </TextField>
    </Box>
  );
}
