import React, { useState, useEffect } from "react";
import axios from "axios";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, MenuItem, Select, Typography, Box, TextField, Card } from "@mui/material";



export function EditPopUp({areaId, close, handleClose, handleRefresh, selectedLocation }) {
    console.log('AREA ID IN EDIT -> ',areaId);

    const [nombre_area, setNombre_area] = useState('');
    const [responde_a, setResponde_a] = useState('');

    let nombre_filtrar = '';
    useEffect(()=>{
        axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/read.php?id=${selectedLocation}&area_id=${areaId}`)
        .then((response) => {
            const { data } = response;
            const { organigrama } = data;
            setNombre_area(organigrama[0].nombre_area);
            nombre_filtrar = organigrama[0].nombre_area;
            setResponde_a(organigrama[0].responde_a);
        })
        .catch((err) => {
            console.log(err)
        });
    }, []);

    const [data, setData] = useState(null);
    const [rootInLocation, setRootInlocation] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/read.php?id=${selectedLocation}`)
            .then((response) => {
                const { data } = response;
                const { organigrama } = data;
                const x = organigrama.filter(e => e.responde_a === null);
                setRootInlocation(x.length >= 1);
                const filteredOrgChart = organigrama.filter(e => e.nombre_area !== nombre_filtrar);
                setData(filteredOrgChart);
            })
            .catch((err) => {
                console.log(err)
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        console.log('ON SUBMIT ->> ',{
            area: nombre_area,
            responde_a: responde_a,
            id: areaId
        });

        
        axios.patch(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/update.php`, {
            area: nombre_area,
            responde_a: responde_a,
            id: areaId
        })
            .then((response) => console.log('ENVIADO PATCH!', response))
            .catch(error => console.log(error))
    };

    const handleSelectChange = ({ target }) => setResponde_a(target.value);
    const handleTextChange = ({ target }) => setNombre_area(target.value);

    return (
        <Card sx={{ padding: "1rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <Box sx={{ alignSelf: "flex-end" }}>
                <FontAwesomeIcon className="closeIcon" icon={faXmark} onClick={handleClose} />
            </Box>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 2fr",
                    gridTemplateRows: "1fr",
                    rowGap: "1rem",
                }}
            >
                <Typography variant="h5" mr={5}>
                    Nombre:
                </Typography>
                <TextField value={nombre_area} onChange={handleTextChange} />

                <Typography variant="h5" mr={1}>
                    Responde a:
                </Typography>
                <Select value={responde_a} onChange={handleSelectChange}>
                    {rootInLocation == false ? <MenuItem key="raiz" value={null}>Raiz</MenuItem> : null}
                    {data?.map((area) => (
                        <MenuItem key={area.nombre_area} value={area.nombre_area}>
                            {area.nombre_area}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <Button
                type="submit"
                variant="contained"
                size="medium"
                sx={{ color: "#FFF", width: "30%", alignSelf: "flex-end" }}
                onClick={handleSubmit}
            >
                Continuar
            </Button>
        </Card>
    );
}
