/**
=========================================================
* Material Dashboard 2 React - v2.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import Card from "@mui/material/Card";
import MDTypography from "components/MDTypography";
import { useState } from "react";
import MoreFilters from "./MoreFilters";


const initialFormValues = {
  nombre: "",
  meta: "",
  hora_inicial: "",
  hora_final: "",
  detalle: "",
  tipo_instruccion: "",
  fecha_inicial: "",
  fecha_final: "",
};

function SearchForm({ handleShowFilter, widthOfTable }) {
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialFormValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((v) => ({
      ...v,
      [name]: value,
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const newFormErrors = { ...formErrors };
    delete newFormErrors[name];

    setFormErrors(newFormErrors);
  };

  const [showFilter, setShowFilter] = useState(false);

  const handleFilterClick = () => {
    setShowFilter((current) => !current);
  };

  return (
    <Card
      style={{
        position: "absolute",
        zIndex: 99,
        width: widthOfTable,
        padding: "1rem",
        maxHeight: "60vh",
        overflowY: "scroll",
      }}
    >
      <FontAwesomeIcon className="closeIcon" icon={faXmark} onClick={handleShowFilter} />
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gridTemplateAreas: `"buscarPor buscarPor buscarPor . . ."
        "nombre nombre nombre tTarea tTarea tTarea"
        "fInicial fInicial fFinal fFinal sucursal sucursal"`,
          gap: "1rem",
        }}
      >
        <Box sx={{ gridArea: "buscarPor" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Buscar por:
          </MDTypography>

          <TextField
            fullWidth
            select
            value={formValues.tipoBusqueda}
            onChange={handleInputChange}
            SelectProps={{
              MenuProps: { disablePortal: true },
            }}
          >
            <MenuItem value="T/U">
              <em>T/U</em>
            </MenuItem>
            <MenuItem value="tarea">Tarea</MenuItem>
            <MenuItem value="usuario">Usuario</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ gridArea: "nombre" }}>
          <MDTypography variant="h6" fontWeight="medium">
            Nombre
          </MDTypography>
          <TextField
            fullWidth
            name="nombre"
            value={formValues.nombre}
            onChange={handleInputChange}
            error={formErrors.nombre}
            onBlur={handleBlur}
          />
        </Box>
        <Box sx={{ gridArea: "tTarea" }}>
          <MDTypography variant="h6" fontWeight="medium">
            Tipo de tarea:
          </MDTypography>

          <TextField
            select
            fullWidth
            name="tipoBusqueda"
            value={formValues.tipoBusqueda}
            onChange={handleInputChange}
            SelectProps={{
              MenuProps: { disablePortal: true },
            }}
            error={formErrors.tipoBusqueda}
            onBlur={handleBlur}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="accion">Acción</MenuItem>
            <MenuItem value="informativa">informativa</MenuItem>
            <MenuItem value="meta">Meta</MenuItem>
          </TextField>
        </Box>
        <Box sx={{ gridArea: "fInicial" }}>
          <MDTypography variant="h6" fontWeight="medium">
            Fecha inicial
          </MDTypography>
          <TextField
            name="fechaInicial"
            type="date"
            fullWidth
            // sx={{ marginTop: 3, marginRight: 3 }}
            value={formValues.fechaInicial}
            onChange={handleInputChange}
            error={formErrors.fechaInicial}
            onBlur={handleBlur}
          />
        </Box>
        <Box sx={{ gridArea: "fFinal" }}>
          <MDTypography variant="h6" fontWeight="medium">
            Fecha final
          </MDTypography>
          <TextField
            name="fechaFinal"
            type="date"
            fullWidth
            // sx={{ marginTop: 3, marginRight: 3 }}
            value={formValues.fechaFinal}
            onChange={handleInputChange}
            error={formErrors.fechaFinal}
            onBlur={handleBlur}
          />
        </Box>
        <Box sx={{ gridArea: "sucursal" }}>
          <MDTypography variant="h6" fontWeight="medium">
            Sucursal:
          </MDTypography>
          <TextField
            fullWidth
            name="sucursal"
            value={formValues.sucursal}
            onChange={handleInputChange}
            error={formErrors.sucursal}
            onBlur={handleBlur}
            select
            SelectProps={{
              MenuProps: { disablePortal: true },
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="op1">op1</MenuItem>
            <MenuItem value="op2">op2</MenuItem>
          </TextField>
        </Box>
      </Box>
      <Box sx={{ alignSelf: "flex-end" }}>
        <Button onClick={handleFilterClick}>...mas filtros</Button>
      </Box>
      {showFilter && <MoreFilters />}
    </Card>
  );
}

export default SearchForm;
