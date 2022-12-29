import { faPenToSquare, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Box, Button, Modal, TextField } from "@mui/material";
import { Card, MenuItem } from "@mui/material";
import axios from "axios";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import React, { useState } from "react";


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

const buttonStyle = {
    width: "fit-content", color: "#FFF", marginTop: "1.5rem", backgroundColor: '#1A73E8'
}


function ActionButtons({ id, handleRefresh }) {
    const [openEdit, setOpenEdit] = useState(false);
    const handleEdit = () => {
        setOpenEdit(prev => !prev);
    };

    const [state, setState] = useState('');
    const [stateError, setStateError] = useState(false);

    const [city, setCity] = useState('');
    const [cityError, setCityError] = useState(false);

    const [cityCode, setCityCode] = useState('');
    const [cityCodeError, setCityCodeError] = useState(false);

    const [listedStates, setListedStates] = useState([]);

    const handleClick = () => {
        handleEdit();
        axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/read.php?id=${id}`)
            .then((response) => {
                const { data } = response;
                const { ciudad } = data;
                setState(ciudad[0].id_edo);
                setCity(ciudad[0].nombre_ciud);
                setCityCode(ciudad[0].clave)
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
            })
            .catch((error) => console.log(error));
    };

    const handleStateChange = ({ target }) => {
        setState(target.value);
    };

    const handleCityChange = ({ target }) => {
        setCity(target.value);
    }

    const handleCityCodeChange = ({ target }) => {
        setCityCode(target.value);
    }

    const validateCitiesInput = () => {
        (state.length <= 0) ? setStateError(true) : setStateError(false);
        (city.length <= 0) ? setCityError(true) : setCityError(false);
        (cityCode.length <= 0) ? setCityCodeError(true) : setCityCodeError(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        validateCitiesInput();
        if (stateError === false && cityError === false) {
            axios.patch(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/update.php`, {
                id: id,
                nombre_ciud: city,
                clave: cityCode,
                id_edo: state,
            })
                .then((response) => console.log('ENVIADO PATCH!', response))
                .catch(error => console.log(error))

            setState('');
            setCity('');
            setCityCode('');
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
        axios.patch('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/cities/delete.php', {
            id: id,
        })
            .then((response) => console.log('Borrado :D', response))
            .catch(error => {
                if (error.message === 'Request failed with status code 503') {
                    alert('La sucursal no se puede borrar por que ya se está utilizando');
                }
                console.log(error);
            })

        handleDelete();
        handleRefresh();
    };


    return (
        <>
            <Modal open={openEdit} onClose={handleEdit}>
                <Card style={modalStyle} sx={{ display: "flex", gap: '1rem', width: "20%" }}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <FontAwesomeIcon icon={faXmark} size="lg" style={{ cursor: "pointer" }} onClick={handleEdit} />
                    </div>

                    <Box style={{ display: "flex", flexDirection: "column", gap: '1rem' }}>
                        <Box>
                            <MDTypography variant="h6" fontWeight="medium">Estado</MDTypography>
                            <TextField
                                select
                                fullWidth
                                size='small'
                                variant='outlined'
                                name="nombre_edo"
                                defaultValue={state}
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

                        <Box>
                            <MDTypography variant="h6" fontWeight="medium">Ciudad</MDTypography>
                            <TextField
                                size='small'
                                variant='outlined'
                                fullWidth
                                name="ciudad"
                                value={city}
                                onChange={handleCityChange}
                                error={cityError}
                            />
                        </Box>

                        <Box>
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


                    <Button style={{ alignSelf: "flex-end" }} sx={buttonStyle} variant="contained" onClick={handleSubmit}>Guardar</Button>
                </Card>
            </Modal>

            <Modal open={openDelete} onClose={handleDelete}>
                <Card style={modalStyle} sx={{ display: "flex", gap: "1.5rem" }}>
                    <div style={{ width: "100%", display: "flex", justifyContent: "flex-end" }}>
                        <FontAwesomeIcon icon={faXmark} size="lg" style={{ cursor: "pointer" }} onClick={handleDelete} />
                    </div>

                    <MDTypography variant="h6" fontWeight="medium">Borrar?, esta opción no es reversible</MDTypography>
                    <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                        <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={confirmDelete}>Borrar ciudad</Button>
                        <Button style={{ width: "fit-content", color: "#FFF", backgroundColor: '#1A73E8' }} variant="contained" onClick={handleDelete}>Cancelar</Button>
                    </Box>
                </Card>
            </Modal>

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
                <FontAwesomeIcon icon={faPenToSquare} size='lg' onClick={handleClick} style={actionButton} />
                <FontAwesomeIcon icon={faTrash} size='lg' style={actionButton} onClick={handleDelete} />
            </div>
        </>
    )
};

export default function CityTable({ allCities, handleRefresh }) {
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
    const columns = [
        { Header: "ID", accessor: "ID", align: "left" },
        { Header: "Estado", accessor: "Estado", align: "left" },
        { Header: "Nombre", accessor: "Nombre", align: "left" },
        { Header: "Clave", accessor: "Clave", align: "left" },
        { Header: "Editar", accessor: "Editar", align: "left" },
    ];

    const rows = allCities.map((elem) => ({
        ID: <TableFiller name={elem.id} />,
        Estado: <TableFiller name={elem.nombre_edo} />,
        Nombre: <TableFiller name={elem.nombre} />,
        Clave: <TableFiller name={elem.clave} />,
        Editar: <ActionButtons id={elem.id} handleRefresh={handleRefresh} />,
    }));


    return (
        <Card style={{ height: "75%" }}>
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
