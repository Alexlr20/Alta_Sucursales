import { useEffect, useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import MDTypography from 'components/MDTypography';
import axios from 'axios';
import { PropTypes } from 'prop-types';
import { MenuItem } from '@mui/material';

function AddLocality({ handleRefresh, refresh }) {
    const [state, setState] = useState('');
    const [stateError, setStateError] = useState(false);
    const [listedStates, setListedStates] = useState([]);

    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState(false);
    const [listedCities, setListedCities] = useState([]);

    const [locality, setLocality] = useState('');
    const [localityError, setLocalityError] = useState(false);

    const [postalCode, setPostalCode] = useState('');
    const [postalCodeError, setPostalCodeError] = useState(false);

    useEffect(() => {
        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php')
            .then((response) => {
                const { data } = response;
                const {estado} = data;
                setListedStates(estado);
            })
            .catch((error) => console.log(error));

    }, [refresh]);

    useEffect(() => {
        axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?byStateId=1&id=${state}`)
            .then((response) => {
                const { data } = response;
                const {ciudad} = data;
                setListedCities(ciudad);
            })
            .catch((error) => {
                if(error) console.log(error);
            });

    }, [refresh, state]);



    const handleStateChange = ({ target }) => {
        setState(target.value);
        setCity(null);
    };

    const handleCityChange = ({ target }) => setCity(target.value);
    const handleLocalityChange = ({ target }) => setLocality(target.value);
    const handlePostalCodeCodeChange = ({ target }) => setPostalCode(target.value);

    const validateLocalitiesInput = () => {
        (state.length <= 0) ? setStateError(true) : setStateError(false);
        (city.length <= 0) ? setCityError(true) : setCityError(false);
        (locality.length <= 0) ? setLocalityError(true) : setLocalityError(false);
        (postalCode.length <= 0) ? setPostalCodeError(true) : setPostalCodeError(false);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        validateLocalitiesInput();
        if (stateError === false && cityError === false) {
            axios.post('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/localities/create.php', {
                id_edo: state,
                id_ciud: city,
                nombre: locality,
                codigo_postal: postalCode 
            })
            .then((response) => console.log('ENVIADO!',response))
            .catch((error) => console.log(error));
            
            setState('');
            setCity('');
            setLocality('');
            setPostalCode('');
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
                        name="nombre_edo"
                        value={state}
                        onChange={handleStateChange}
                        error={stateError}
                    >
                        {listedStates?.map((state) => (
                            <MenuItem key={state.id} value={state.id}>
                                {state.nombre_edo}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box sx={{ width: "50%" }}>
                    <MDTypography variant="h6" fontWeight="medium">Ciudad</MDTypography>
                    <TextField
                        select
                        fullWidth
                        size='small'
                        variant='outlined'
                        name="nombre_ciudad"
                        value={city}
                        disabled={!state}
                        onChange={handleCityChange}
                        error={cityError}
                    >
                        {listedCities?.map((city) => (
                            <MenuItem key={city.id} value={city.id}>
                                {city.nombre}
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>

                <Box sx={{ width: "40%" }}>
                    <MDTypography variant="h6" fontWeight="medium">Nombre</MDTypography>
                    <TextField
                        size='small'
                        variant='outlined'
                        fullWidth
                        name="locality"
                        value={locality}
                        onChange={handleLocalityChange}
                        error={localityError}
                    />
                </Box>

                <Box sx={{ width: "40%" }}>
                    <MDTypography variant="h6" fontWeight="medium">C.P</MDTypography>
                    <TextField
                        size='small'
                        variant='outlined'
                        fullWidth
                        name="postal_code"
                        value={postalCode}
                        onChange={handlePostalCodeCodeChange}
                        error={postalCodeError}
                    />
                </Box>
            </Box>

            <Button style={{ alignSelf: "flex-end", width: "fit-content", color: "#FFF", marginTop: "1rem", backgroundColor: '#1A73E8' }} variant="contained" onClick={handleSumbit}>Agregar Ciudad</Button>
        </Card >
    )
}

AddLocality.propTypes = {
    handleRefresh: PropTypes.func.isRequired,
}

export default AddLocality;