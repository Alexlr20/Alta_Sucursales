import { FormControl, MenuItem, Select, TextField } from '@mui/material'
import { Box } from '@mui/system'
import axios from 'axios'
import MDBox from 'components/MDBox'
import MDTypography from 'components/MDTypography'
import React, { useEffect, useState } from 'react'

const generalContainer = {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 2,
    gridTemplateRows: "auto",
    gridTemplateAreas: `"nomSuc nomSuc ."
    "nomVialidad int ext"
    "tVialidad loc cp"
    "edo mun col"`,
    width: "100%",
}

export const LocationFields = ({ formValues, setFormValues, formErrors, setFormErrors }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;

        switch (name) {
            case 'estado':
                setFormValues((v) => ({
                    ...v,
                    "municipio": "",
                    "colonia": "",
                    [name]: value,
                }));
                break;

            case 'municipio':
                setFormValues((v) => ({
                    ...v,
                    "colonia": "",
                    [name]: value,
                }));
                break;

            default:
                setFormValues((v) => ({
                    ...v,
                    [name]: value,
                }));
                break;
        }


    };

    const handleBlur = (e) => {
        const { name } = e.target;
        const newFormErrors = { ...formErrors };
        delete newFormErrors[name];

        setFormErrors(newFormErrors);
    };

    const [allListedStates, setAllListedStates] = useState([]);
    useEffect(() => {
        axios
            .get("http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php")
            .then((resp) => {
                const { data } = resp;
                const { estado } = data;
                console.log("RESPUESTA DE AXIOS ESTADOS", estado);
                setAllListedStates(estado);
            })
            .catch((error) => console.error(error));

        console.log(allListedStates);
    }, []);

    const [allListedCities, setAllListedCities] = useState([]);
    useEffect(() => {
        axios
            .get(
                `http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?byStateId=1&id=${formValues.estado}`
            )
            .then((response) => {
                const { data } = response;
                const { ciudad } = data;
                setAllListedCities(ciudad);
            })
            .catch((error) => console.log(error));
    }, [formValues.estado]);

    const [allListedLocalities, setAllListedLocalities] = useState([]);
    useEffect(() => {
        axios
            .get(
                `http://localhost/ddsoftware/Alta_Sucursales/src/PHP/localities/read.php?byCityId=1&id=${formValues.municipio}`
            )
            .then((response) => {
                const { data } = response;
                const { colonia } = data;
                console.log('RESPUETACOLONIASI', colonia);
                // const { ciudad } = data;
                setAllListedLocalities(colonia);
            })
            .catch((error) => console.log(error));
    }, [formValues.estado, formValues.municipio]);

    const [allListedRoadTypes, setAllListedRoadTypes] = useState([]);
    useEffect(() => {
        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/road_types/read.php')
            .then(resp => {
                const { data } = resp;
                const { tipo_vialidad } = data;
                setAllListedRoadTypes(tipo_vialidad);
                console.log(allListedRoadTypes);
            })
            .catch()

    }, []);


    return (
        <Box sx={generalContainer}>
            <Box sx={{ gridArea: "nomSuc" }}>

                {/* Nombre de Sucursal */}
                <MDBox>
                    <FormControl variant="standard" sx={{ marginBottom: 2, width: "70%" }} autoComplete="off">
                        <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>Nombre de Sucursal</MDTypography>
                        <TextField
                            name="nombre_sucursal"
                            value={formValues.nombre_sucursal}
                            onChange={handleInputChange}
                            error={formErrors.nombre_sucursal}
                            onBlur={handleBlur}
                        />
                    </FormControl>
                </MDBox>
            </Box>

            <Box sx={{ gridArea: "nomVialidad" }}>

                {/* Nombre vialidad */}
                <MDBox>
                    <FormControl variant="standard" fullWidth sx={{ marginBottom: 2 }}>
                        <MDTypography variant="h6" fontWeight="medium">
                            Nombre Vialidad
                        </MDTypography>
                        <TextField
                            name="nombre_vialidad"
                            value={formValues.nombre_vialidad}
                            onChange={handleInputChange}
                            error={formErrors.nombre_vialidad}
                            onBlur={handleBlur}
                        />
                    </FormControl>
                </MDBox>
            </Box>

            <Box sx={{ gridArea: "int" }}>

                {/* Numero Interior */}
                <MDBox>
                    <FormControl variant="standard" fullWidth sx={{ marginBottom: 2 }}>
                        <MDTypography variant="h6" fontWeight="medium">
                            Numero Interior
                        </MDTypography>
                        <TextField
                            name="num_interior"
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            value={formValues.num_interior}
                            onChange={handleInputChange}
                            error={formErrors.num_interior}
                            onBlur={handleBlur}
                        />
                    </FormControl>
                </MDBox>
            </Box>

            <Box sx={{ gridArea: "ext" }}>

                {/* Numero Exterior */}
                <MDBox>
                    <FormControl variant="standard" fullWidth>
                        <MDTypography variant="h6" fontWeight="medium">
                            Numero Exterior
                        </MDTypography>
                        <TextField
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            name="num_exterior"
                            value={formValues.num_exterior}
                            onChange={handleInputChange}
                            error={formErrors.num_exterior}
                            onBlur={handleBlur}
                        />
                    </FormControl>
                </MDBox>
            </Box>

            <Box sx={{ gridArea: "tVialidad" }}>
                {/* Tipo Vialidad */}
                <MDBox>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <MDTypography variant="h6" fontWeight="medium">
                            Tipo Vialidad
                        </MDTypography>
                        <Select
                            name="tipo_vialidad"
                            value={formValues.tipo_vialidad}
                            onChange={handleInputChange}
                            error={formErrors.tipo_vialidad}
                            onBlur={handleBlur}
                        >
                            {
                                allListedRoadTypes.map((roadType) => <MenuItem key={roadType.id} value={roadType.id}>{roadType.tipo}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </MDBox>
            </Box>

            <Box sx={{ gridArea: "loc" }}>
                {/* Nombre de localidad */}
                <MDBox>
                    <FormControl variant="standard" fullWidth>
                        <MDTypography variant="h6" fontWeight="medium">
                            Nombre de localidad
                        </MDTypography>
                        <TextField
                            name="nombre_localidad"
                            value={formValues.nombre_localidad}
                            onChange={handleInputChange}
                            error={formErrors.nombre_localidad}
                            onBlur={handleBlur}
                        />
                    </FormControl>
                </MDBox>
            </Box>

            <Box sx={{ gridArea: "cp" }}>
                {/* Nombre de localidad */}
                <MDBox>
                    <FormControl variant="standard" fullWidth>
                        <MDTypography variant="h6" fontWeight="medium">
                            Código postal
                        </MDTypography>
                        <TextField
                            type="number"
                            InputProps={{ inputProps: { min: 0 } }}
                            name="codigo_postal"
                            value={formValues.codigo_postal}
                            onChange={handleInputChange}
                            error={formErrors.codigo_postal}
                            onBlur={handleBlur}
                        />
                    </FormControl>
                </MDBox>
            </Box>

            <Box sx={{ gridArea: "col" }}>
                {/* Colonia */}
                <MDBox>
                    <FormControl variant="standard" fullWidth>
                        <MDTypography variant="h6" fontWeight="medium">
                            Colonia
                        </MDTypography>
                        <TextField
                            select
                            name="colonia"
                            value={formValues.colonia}
                            onChange={handleInputChange}
                            error={formErrors.colonia}
                            onBlur={handleBlur}
                            disabled={!formValues.estado || !formValues.municipio}
                        >
                            {
                                allListedLocalities.map((locality) =>
                                    <MenuItem value={locality.id} key={locality.id}>{locality.nombre}</MenuItem>
                                )
                            }
                        </TextField>
                    </FormControl>
                </MDBox>
            </Box>
            <Box sx={{ gridArea: "edo" }}>
                {/* Estado */}
                <MDBox>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <MDTypography variant="h6" fontWeight="medium">
                            Estado
                        </MDTypography>
                        <Select
                            sx={{ width: "fitContent" }}
                            name="estado"
                            value={formValues.estado}
                            onChange={handleInputChange}
                            error={formErrors.estado}
                            onBlur={handleBlur}
                        >
                            {allListedStates?.map((state) => (
                                <MenuItem key={state.id} value={state.id}>
                                    {state.nombre_edo}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </MDBox>
            </Box>

            <Box sx={{ gridArea: "mun" }}>
                {/* Municipio */}
                <MDBox>
                    <FormControl fullWidth sx={{ marginBottom: 2 }}>
                        <MDTypography variant="h6" fontWeight="medium">
                            Municipio
                        </MDTypography>
                        <Select
                            sx={{ width: "fitContent" }}
                            name="municipio"
                            value={formValues.municipio}
                            onChange={handleInputChange}
                            error={formErrors.municipio}
                            onBlur={handleBlur}
                            disabled={!formValues.estado}
                        >
                            {allListedCities?.map((city) => (
                                <MenuItem key={city.id} value={city.id}>
                                    {city.nombre}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </MDBox>
            </Box>
        </Box>
    )
}
