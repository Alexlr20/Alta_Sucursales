/* eslint-disable */

import { useEffect, useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import MDTypography from 'components/MDTypography';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { MenuItem } from '@mui/material';

function AddCity({ handleRefresh, refresh }) {
    const [state, setState] = useState('');
    const [stateError, setStateError] = useState(false);

    const [listedStates, setListedStates] = useState([]);

    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState(false);

    const [cityCode, setCityCode] = useState('');
    const [cityCodeError, setCityCodeError] = useState(false);

    useEffect(() => {
        // axios.get('http://localhost:8000/states/')
        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php')
            .then((response) => {
                const { data } = response;
                const { estado } = data;
                console.log('ESTADWtff', estado);
                setListedStates(estado);
            })
            .catch((error) => console.log(error));

    }, [refresh]);

    const handleChange = ({ target }) => {
        setState(target.value);
    };

    const handleCityChange = ({ target }) => {
        setCity(target.value);
    }

    const handleCityCodeChange = ({ target }) => {
        setCityCode(target.value);
    }

    const validateCitiesInput = () => {
        if (state.length <= 0) {
            setStateError(true)
        } else {
            setStateError(false);
        }

        if (city.length <= 0) {
            setCityError(true)
        } else {
            setCityError(false);
        }

        if (cityCode.length <= 0) {
            setCityCodeError(true)
        } else {
            setCityCodeError(false);
        }
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        validateCitiesInput();
        if (stateError === false && cityError === false) {
            console.log('No errors :D');
            console.log(state);
            console.log(city);
            console.log(cityCode);

            // axios.post('http://localhost:8000/cities/', {
            axios.post('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/create.php', {
                id_edo: state,
                nombre_ciud: city,
                clave: cityCode
            })
                .then((response) => console.log('ENVIADO!', response))
                .catch((error) => console.log(error));

            setState('');
            setCity('');
            setCityCode('');
            handleRefresh();
        }
    };

    return (
        <Card style={{ padding: "1rem", display: "flex", flexDirection: "column", height: "fit-content" }}>
            <Typography style={{ marginBottom: "1rem" }}>Agregar Ciudad:</Typography>

            <Box style={{ display: "grid", gridTemplateRows: "1fr 1fr", rowGap: "1rem" }}>
                <Box sx={{ width: "50%" }}>
                    <MDTypography variant="h6" fontWeight="medium">Estado</MDTypography>
                    <TextField
                        select
                        fullWidth
                        size='small'
                        variant='outlined'
                        name="nombre_estado"
                        value={state}
                        onChange={handleChange}
                        error={stateError}
                    >
                        {listedStates?.map((state) => (
                            <MenuItem key={state.id} value={state.id}>
                                {state.nombre_edo}
                            </MenuItem>
                        )
                        )}
                    </TextField>
                </Box>

                <Box sx={{ width: "40%" }}>
                    <MDTypography variant="h6" fontWeight="medium">Ciudad</MDTypography>
                    <TextField
                        size='small'
                        variant='outlined'
                        fullWidth
                        name="city"
                        value={city}
                        onChange={handleCityChange}
                        error={cityError}
                    />
                </Box>

                <Box sx={{ width: "40%" }}>
                    <MDTypography variant="h6" fontWeight="medium">Clave</MDTypography>
                    <TextField
                        size='small'
                        variant='outlined'
                        fullWidth
                        name="city_code"
                        value={cityCode}
                        onChange={handleCityCodeChange}
                        error={cityCodeError}
                    />
                </Box>
            </Box>

            <Button style={{ alignSelf: "flex-end", width: "fit-content", color: "#FFF", marginTop: "1rem", backgroundColor: '#1A73E8' }} variant="contained" onClick={handleSumbit}>Agregar Ciudad</Button>
        </Card >
    )
}

AddCity.propTypes = {
    handleRefresh: PropTypes.func.isRequired,
}

export default AddCity;