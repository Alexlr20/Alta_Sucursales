/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { Box, MenuItem, TextField } from "@mui/material";
import axios from "axios";
import MDTypography from "components/MDTypography";
import { useEffect, useState } from "react";

// eslint-disable-next-line import/prefer-default-export
export function StateDropdown({stateValue, setStateValue}) {

    const [allListedStates, setAllListedStates] = useState(null);

    useEffect(() => {
        const abortCont = new AbortController();

        // if (dropdownValue == 'nonSuspended') {
        // axios.get('http://localhost:8000/cities/')
        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php'
            // , {data: {id: 5}}
        )
            .then((response) => {
                const { data } = response;
                const { estado } = data;
                // console.log(estado);
                setAllListedStates(estado);
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
        setStateValue(target.value);
    };

  return (
    <Box style={{display: "flex", width: "70%", alignSelf: "flex-end", gap: "1rem"}}>
      <MDTypography variant="h6" fontWeight="medium">
        Estado
      </MDTypography>
      <TextField
        select
        fullWidth
        size="small"
        variant="outlined"
        name="nombre_estado"
        value={stateValue}
        onChange={handleChange}
        // error={stateError}
      >
        <MenuItem key='all' value='all' selected>Todos</MenuItem>
        {
            allListedStates && allListedStates?.map(state => <MenuItem key={state.id} value={state.id}>{state.nombre_edo}</MenuItem>)
        }
      </TextField>
    </Box>
  );
}
