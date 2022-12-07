import { useState } from 'react';
import { Box, Button, Card, TextField, Typography } from '@mui/material';
import MDTypography from 'components/MDTypography';
import axios from 'axios';
import { PropTypes } from 'prop-types';

function AddRoadType({handleRefresh}) {
    console.log(handleRefresh);
    const [roadType, setRoadType] = useState('');
    const [roadTypeError, setRoadTypeError] = useState(false);

    const handleChange = ({ target }) => {
        setRoadType(target.value);
    };

    const validateInput = () => {
        if (roadType.length <= 0) {
            setRoadTypeError(true)
        } else {
            setRoadTypeError(false);
        }
    };

    const handleSumbit = (e) => {
        e.preventDefault();
        validateInput();
        if (roadTypeError === false) {
            console.log('No errors :D');

            // axios.post('http://localhost:8000/road-types/', {
            axios.post('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/road_types/create.php', {
                tipo: roadType
            })
            .then((response) => console.log('ENVIADO!',response))
            .catch((error) => console.log(error));

            setRoadType('');
            handleRefresh();
        }
    };

    return (
        <Card style={{ padding: "1rem", display: "flex", flexDirection: "column", height: "fit-content"}}>
            <Typography style={{ marginBottom: "1rem" }}>Agregar Tipo Vialidad:</Typography>

            <Box style={{ display: "grid", gridTemplateRows: "1fr", rowGap: "1rem"}}>
                <Box sx={{ width: "50%"}}>
                    <MDTypography variant="h6" fontWeight="medium">Tipo Vialidad</MDTypography>
                    <TextField
                        fullWidth
                        size='small'
                        variant='outlined'
                        name="nombre_estado"
                        value={roadType}
                        onChange={handleChange}
                        error={roadTypeError}
                    />
                </Box>
            </Box>

            <Button style={{ alignSelf: "flex-end", width: "fit-content", color: "#FFF", marginTop: "1rem", backgroundColor: '#1A73E8' }} variant="contained" onClick={handleSumbit}>Agregar</Button>
        </Card >
    )
}

AddRoadType.propTypes = {
    handleRefresh: PropTypes.func.isRequired,
}

export default AddRoadType;