import React, { useState, useEffect } from "react";
import axios from "axios";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, MenuItem, Select, Typography, Box, TextField, Card } from "@mui/material";



export function OrgPopUp({ close, handleClose, handleRefresh, selectedLocation}) {
  const [nombre_area, setNombre_area] = useState("");
  const [responde_a, setResponde_a] = useState("");

  const [data, setData] = useState(null);
  const [rootInLocation, setRootInlocation] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/read.php?id=${selectedLocation}`)
      .then((response) => {
        const { data } = response;
        const { organigrama } = data;
        const x = organigrama.filter(e => e.responde_a === null);
        setRootInlocation(x.length >= 1);
        setData(organigrama);
      })
      .catch((err) => {
        console.log(err)
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost/ddsoftware/Alta_Sucursales/src/PHP/orgchart/create.php', {
      nombre_area: nombre_area,
      responde_a: responde_a,
      id_sucursal: selectedLocation
    })
      .then((response) => console.log('ENVIADO!', response))
      .catch((error) => console.log(error));

    handleRefresh();
    close();
  };

  const handleSelectChange = ({ target }) => {
    setResponde_a(target.value);
  };

  const handleTextChange = ({ target }) => {
    setNombre_area(target.value);
  };

  return (
    // <div className="popUp card">
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
