import { Box, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";

// eslint-disable-next-line import/prefer-default-export
export function CityDropdown({cityValue, setCityValue}) {

    const [allListedCities, setAllListedCities] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        // if (dropdownValue == 'nonSuspended') {
        // axios.get('http://localhost:8000/cities/')
        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php'
            // , {data: {id: 5}}
        )
            .then((response) => {
                const { data } = response;
                const { ciudad } = data;
                console.log('Olasi',ciudad);
                setAllListedCities(ciudad);
                // console.log('DATA IN AXIOS GET',data);
                // setAllPendingCities(false);
                // setAllCities(ciudad);
                // setAllCitiesError(null);
            }
            )
            .catch((error) => {
                if (error === 'AbortError') {
                    console.log(error);
                }
                // else {
                //     setAllPendingCities(false);
                //     setAllCitiesError(error);
                // }
            });
        // } else if (dropdownValue == 'suspended'){
        //     console.log('olaaa');
        // }

        return () => abortCont.abort();
    }, []);


    const handleChange = ({target}) => {
        console.log(target.value);
        setCityValue(target.value);
    };

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
