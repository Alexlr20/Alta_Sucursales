/* eslint-disable */
/* eslint-disable react/prop-types */
import { faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, TextField, Card, MenuItem } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
function ActionButtons({ id, handleRefresh }) {
    const [openEdit, setOpenEdit] = useState(false);
    const handleEdit = () => {
        setOpenEdit(prev => !prev);
    };

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

    useEffect(()=>{
        // axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?id=${state}`)
        axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?byStateId=1&id=${state}`)
        .then((response) => {
            const { data } = response;
            const {ciudad} = data;
            console.log('OLA YO SOY CIUDAD SI eh k peo', ciudad);
            setListedCities(ciudad);
        })
        .catch((error) => console.log(error));
    }, [state]);
    
    const handleClick = () => {
        handleEdit();
        // axios.get(`http://localhost:8000/localities/${id}`)
        axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/localities/read.php?id=${id}`)
            .then((response) => {
                const { data } = response;
                const {colonia} = data;
                // setState(colonia[0].nombre_edo);
                setState(colonia[0].id_edo);
                setCity(colonia[0].id_ciud);
                // setCity();
                setLocality(colonia[0].nombre);
                setPostalCode(colonia[0].codigo_postal);
            })
            .catch((error) => {
                if (error === 'AbortError') {
                    console.log(error);
                }
            });

        axios.get('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/states/read.php')
            .then((response) => {
                const { data } = response;
                const { estado } = data;
                setListedStates(estado);
                // console.log('GET ESTADOS SI',estado);
            })
            .catch((error) => console.log(error));

        // axios.get('http://localhost:8000/states/')
        //     .then((response) => {
        //         const { data } = response;
        //         console.log('RECIBIDOOOS', data)
        //         setListedStates(data);
        //     })
        //     .catch((error) => console.log(error));

        // axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?id=${state}`)
        // .then((response) => {
        //     // console.log('ESTE ES EL ESTADO DENTRO DE ',state);
        //     const { data } = response;
        //     const {ciudad} = data;
        //     console.log('OLA YO SOY CIUDAD SI', ciudad);
        //     setListedCities(ciudad);
        // })
        // .catch((error) => console.log(error));

        // axios.get('http://localhost:8000/cities/')
        //     .then((response) => {
        //         const { data } = response;
        //         console.log('RECIBIDOOOS', data)
        //         setListedCities(data);
        //     })
        //     .catch((error) => console.log(error));
    };

    const modalStyle = {
        width: "15%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "#FFF",
        padding: "1rem"
    };

    const actionButton = {
        alignSelf: "center",
        cursor: "pointer"
    }

    const handleStateChange = ({ target }) => {
        setState(target.value);
        setCity('');
    };

    const handleCityChange = ({ target }) => {
        setCity(target.value);
    }

    const handleLocalityChange = ({ target }) => {
        setLocality(target.value);
    }

    const handlePostalCodeCodeChange = ({ target }) => {
        setPostalCode(target.value);
    }

    const validateLocalitiesInput = () => {
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

        if (locality.length <= 0) {
            setLocalityError(true)
        } else {
            setLocalityError(false);
        }

        if (postalCode.length <= 0) {
            setPostalCodeError(true)
        } else {
            setPostalCodeError(false);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateLocalitiesInput();
        if (stateError === false && cityError === false) {
            console.log('No errors :D');
            console.log(`EDO: ${state} CD: ${city} COL: ${locality} CP: ${postalCode} ID: ${id}`);

            axios.patch('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/localities/update.php', {
                id:id,
                id_edo: state,
                id_ciud: city,
                nombre: locality,
                codigo_postal: postalCode
            })
                .then((response) => console.log('ENVIADO PATCH!', response))
                .catch(error => console.log(error))

            setState('');
            setCity('');
            setLocality('');
            setPostalCode('');
            handleRefresh();
            handleEdit();
        }
    };

    const [openDelete, setOpenDelete] = useState(false);

    const handleDelete = () => {
        setOpenDelete(prev => !prev);
    };

    const confirmDelete = (e) => {
        e.preventDefault();
        // axios.delete(`http://localhost:8000/localities/${id}`);

        axios.patch('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/localities/delete.php', {
            id: id,
        })
            .then((response) => console.log('Borrado :D', response))
            .catch(error => {
                if (error.message == 'Request failed with status code 503') {
                    alert('La sucursal no se puede borrar por que ya se está utilizando');
                }
                console.log(error);
            })

        handleDelete();
        handleRefresh();
    };

    const buttonStyle = {
        width: "fit-content", color: "#FFF", marginTop: "1.5rem", backgroundColor: '#1A73E8'
    }


    return (
        <>
            <Modal open={openEdit} onClose={handleEdit}>
                <Card style={modalStyle} sx={{ display: "flex", gap: '1rem' }}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <FontAwesomeIcon icon={faXmark} size="lg" style={{ cursor: "pointer" }} onClick={handleEdit} />
                    </div>

                    <Box style={{ display: "flex", flexDirection: "column", gap: '1rem' }}>
                        <Box sx={{ width: "50%" }}>
                            <MDTypography variant="h6" fontWeight="medium">Estado</MDTypography>
                            <TextField
                                select
                                fullWidth
                                size='small'
                                variant='outlined'
                                name="nombre_estado"
                                value={state}
                                onChange={handleStateChange}
                                error={stateError}
                            >
                                {/* {listedStates?.map((state) => (
                                    <MenuItem key={state.nombre} value={state.nombre}>
                                        {state.nombre}
                                    </MenuItem>
                                )
                                )} */}

                                {listedStates?.map((state) => (
                                    <MenuItem key={state.id} value={state.id}>
                                        {state.nombre_edo}
                                    </MenuItem>
                                )
                                )}
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
                                {/* {listedCities?.map((city) => (
                                    <MenuItem key={city.nombre} value={city.nombre}>
                                        {city.nombre}
                                    </MenuItem>
                                )
                                )} */}

                                {listedCities?.map((city) => (
                                    <MenuItem key={city.id} value={city.id}>
                                        {city.nombre_ciud}
                                    </MenuItem>
                                )
                                )}
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
                                type='number'
                                variant='outlined'
                                fullWidth
                                name="postal_code"
                                value={postalCode}
                                onChange={handlePostalCodeCodeChange}
                                error={postalCodeError}
                            />
                        </Box>
                    </Box>


                    <Button style={{ alignSelf: "flex-end" }} sx={buttonStyle} variant="contained" onClick={handleSubmit}>Guardar</Button>
                </Card>
            </Modal>

            <Modal open={openDelete} onClose={handleDelete}>
                <Card style={modalStyle} sx={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <FontAwesomeIcon icon={faXmark} size="lg" style={{ cursor: "pointer" }} onClick={handleDelete} />
                    </div>

                    {/* <Box style={{ display: "flex", flexDirection: "column"}}> */}
                    <MDTypography variant="h6" fontWeight="medium">Borrar?, esta opción no es reversible</MDTypography>
                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={confirmDelete}>Borrar estado</Button>
                        <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={handleDelete}>Cancelar</Button>
                    </Box>
                    {/* </Box> */}
                </Card>
            </Modal>

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <FontAwesomeIcon icon={faPenToSquare} size='lg' onClick={handleClick} style={actionButton} />
                <FontAwesomeIcon icon={faTrash} size='lg' style={actionButton} onClick={handleDelete} />
            </div>
        </>
    )
};

export default function LocalityTable({ allLocalities, handleRefresh }) {
    // eslint-disable-next-line react/no-unstable-nested-components
    function TableFiller({ name, calle }) {
        return (
            <MDBox display="flex" alignItems="center">
                <MDBox ml={0} lineHeight={1} sx={{ zIndex: 1 }}>
                    <MDTypography display="block" variant="caption" fontWeight="medium">
                        {name}
                    </MDTypography>
                    <MDTypography variant="caption" fontWeight="medium">
                        {calle}
                    </MDTypography>
                </MDBox>
            </MDBox>
        );
    }
    console.log(allLocalities);

    const columns = [
        { Header: "ID", accessor: "ID", align: "left" },
        { Header: "Estado", accessor: "Estado", align: "left" },
        { Header: "Ciudad", accessor: "Ciudad", align: "left" },
        { Header: "Nombre", accessor: "Nombre", align: "left" },
        { Header: "CP", accessor: "CP", align: "left" },
        { Header: "Editar", accessor: "Editar", align: "left" },
    ];

    const rows = allLocalities.map((elem) => ({
        ID: <TableFiller name={elem.id} />,
        Estado: <TableFiller name={elem.nombre_edo} />,
        Ciudad: <TableFiller name={elem.nombre_ciud} />,
        Nombre: <TableFiller name={elem.nombre} />,
        CP: <TableFiller name={elem.codigo_postal} />,
        Editar: <ActionButtons id={elem.id} handleRefresh={handleRefresh} />,
    }));


    return (
        <Card>
            <DataTable
                table={{ columns, rows }}
                isSorted={false}

            entriesPerPage={false}
            // showTotalEntries={false}
            // noEndBorder
            />
        </Card>
    );
}
