import { useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import MDTypography from 'components/MDTypography';
import axios from 'axios';
import { PropTypes } from 'prop-types';

function AddState({handleRefresh}) {
    console.log(handleRefresh);
    const [state, setState] = useState('');
    const [stateError, setStateError] = useState(false);
    const [code, setCode] = useState('');
    const [codeError, setCodeError] = useState(false);

    const handleChange = ({ target }) => {
        setState(target.value);
    };

    const handleCodeChange = ({ target }) => setCode(target.value);

    const validateStatesInput = () => {
        (state.length <= 0) ? setStateError(true) : setStateError(false);
        (code.length <= 0) ? setCodeError(true) : setCodeError(false);
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        validateStatesInput();
        if (stateError === false && codeError === false) {
            axios.post('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/create.php', {
                nombre_edo: state,
                codigo: code
            })
            .then((response) => console.log('ENVIADO!',response))
            .catch((error) => console.log(error));

            setState('');
            setCode('');
            handleRefresh();
        }
    };

    return (
        <Card style={{ padding: "1rem", display: "flex", flexDirection: "column", height: "fit-content"}}>
            <Typography style={{ marginBottom: "1rem" }}>Agregar Estado:</Typography>

            <Box style={{ display: "grid", gridTemplateRows: "1fr 1fr", rowGap: "1rem"}}>
                <Box sx={{ width: "50%"}}>
                    <MDTypography variant="h6" fontWeight="medium">Estado</MDTypography>
                    <TextField
                        fullWidth
                        size='small'
                        variant='outlined'
                        name="nombre_estado"
                        value={state}
                        onChange={handleChange}
                        error={stateError}
                    />
                </Box>

                <Box sx={{ width: "30%" }}>
                    <MDTypography variant="h6" fontWeight="medium">Codigo</MDTypography>
                    <TextField
                        size='small'
                        variant='outlined'
                        fullWidth
                        name="codigo"
                        value={code}
                        onChange={handleCodeChange}
                        error={codeError}
                    />
                </Box>
            </Box>

            <Button style={{ alignSelf: "flex-end", width: "fit-content", color: "#FFF", marginTop: "1rem", backgroundColor: '#1A73E8' }} variant="contained" onClick={handleSumbit}>Agregar Estado</Button>
        </Card >
    )
}

AddState.propTypes = {
    handleRefresh: PropTypes.func.isRequired,
}

export default AddState;