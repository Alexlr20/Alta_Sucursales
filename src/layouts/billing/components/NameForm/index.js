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

// @mui material components
import * as React from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Grid,
  Card,
  TextField,
  Checkbox,
  FormLabel,
  Stack,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import { useState } from "react";

const initialValues = {
  monday: false,
  tuesday: false,
  wednesday: false,
  thursday: false,
  friday: false,
  saturday: false,
  sunday: false,
  all: false,
};

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

function NameForm() {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [values, setValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((v) => ({
      ...v,
      [name]: value,
    }));
    // eslint-disable-next-line no-console
    console.log(value);
  };
  const validate = (val) => {
    const errors = {};
    if (!val.nombre) {
      errors.nombre = "Name required";
    }
    if (!val.meta) {
      errors.meta = "Meta required";
    }
    if (!val.hora_inicial) {
      errors.hora_inicial = "Hora inicial required";
    }
    if (!val.hora_final) {
      errors.hora_final = "Hora final required";
    }
    if (!val.detalle) {
      errors.detalle = "Detalle required";
    }
    if (!val.tipo_instruccion) {
      errors.tipo_instruccion = "Tipo de instruccion required";
    }
    if (!val.fecha_inicial) {
      errors.fecha_inicial = "Fecha inicial required";
    }
    if (!val.fecha_final) {
      errors.fecha_final = "Fecha final required";
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const newFormErrors = { ...formErrors };
    delete newFormErrors[name];

    setFormErrors(newFormErrors);
  };

  return (
    <Stack spacing={3}>
      <Card>
        <Grid container spacing={2} p={2} m={2}>
          <Grid item xs={3}>
            <MDBox
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr" },
                gap: 12.9,
              }}
            >
              <div />
              <FormControl fullWidth sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Tipo de instrucción
                </MDTypography>
                <Select
                  name="tipo_instruccion"
                  value={formValues.tipo_instruccion}
                  onChange={handleInputChange}
                  error={formErrors.tipo_instruccion}
                  onBlur={handleBlur}
                  multiline
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value="Instrucciones">Instrucciones</MenuItem>
                  <MenuItem value="Acciones">Acciones</MenuItem>
                  <MenuItem value="Informacion">Informacion</MenuItem>
                </Select>
              </FormControl>
            </MDBox>
          </Grid>
          <Grid item xs={7.5} sx={{ marginLeft: 10 }}>
            <MDBox
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <FormControl variant="standard" sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
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
              </FormControl>
              <FormControl variant="standard">
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Meta
                </MDTypography>
                <TextField
                  fullWidth
                  name="meta"
                  value={formValues.meta}
                  onChange={handleInputChange}
                  error={formErrors.meta}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
            <MDBox
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr" },
                gap: 2,
              }}
            >
              <FormControl variant="standard" sx={{ marginBottom: 2 }}>
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Hora inicial
                </MDTypography>
                <TextField
                  name="hora_inicial"
                  fullWidth
                  type="date"
                  value={formValues.hora_inicial}
                  onChange={handleInputChange}
                  error={formErrors.hora_inicial}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormControl variant="standard">
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Hora final
                </MDTypography>
                <TextField
                  name="hora_final"
                  fullWidth
                  type="date"
                  value={formValues.hora_final}
                  onChange={handleInputChange}
                  error={formErrors.hora_final}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
            <MDBox
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr" },
                gap: 2,
              }}
            >
              <FormControl variant="standard">
                <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
                  Detalle
                </MDTypography>
                <TextField
                  name="detalle"
                  fullWidth
                  multiline
                  rows={4}
                  value={formValues.detalle}
                  onChange={handleInputChange}
                  error={formErrors.detalle}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
          </Grid>
        </Grid>
      </Card>
      <Card>
        <Grid item p={5} xs={12}>
          <Grid item xs={6.7}>
            <MDBox
              component="form"
              noValidate
              sx={{
                display: "grid",
                gridTemplateColumns: { sm: "1fr 1fr " },
                gap: 0,
              }}
            >
              <FormControl variant="standard">
                <MDTypography variant="h5" fontWeight="medium">
                  Fecha inicial
                </MDTypography>
                <TextField
                  name="fecha_inicial"
                  type="date"
                  sx={{ marginTop: 3, marginRight: 3 }}
                  value={formValues.fecha_inicial}
                  onChange={handleInputChange}
                  error={formErrors.fecha_inicial}
                  onBlur={handleBlur}
                />
              </FormControl>
              <FormControl variant="standard">
                <MDTypography variant="h5" fontWeight="medium">
                  Fecha final
                </MDTypography>
                <TextField
                  name="fecha_final"
                  type="date"
                  sx={{ marginTop: 3 }}
                  value={formValues.fecha_final}
                  onChange={handleInputChange}
                  error={formErrors.fecha_final}
                  onBlur={handleBlur}
                />
              </FormControl>
            </MDBox>
          </Grid>
          <MDBox mt={2}>
            <FormLabel sx={{ marginLeft: 2.5 }}>D </FormLabel>
            <FormLabel sx={{ marginLeft: 5 }}>L</FormLabel>
            <FormLabel sx={{ marginLeft: 5 }}>M</FormLabel>
            <FormLabel sx={{ marginLeft: 5 }}>M</FormLabel>
            <FormLabel sx={{ marginLeft: 5 }}>J</FormLabel>
            <FormLabel sx={{ marginLeft: 5 }}>V</FormLabel>
            <FormLabel sx={{ marginLeft: 5 }}>S</FormLabel>
            <FormLabel sx={{ marginLeft: 5 }}>Todos</FormLabel>
          </MDBox>
          <MDBox>
            <MDBox>
              <Checkbox
                name="monday"
                checked={values.all || values.monday}
                onChange={handleChange}
                sx={{ marginLeft: 1 }}
              />
              <Checkbox
                name="tuesday"
                checked={values.all || values.tuesday}
                onChange={handleChange}
                sx={{ marginLeft: 2 }}
              />
              <Checkbox
                name="wednesday"
                checked={values.all || values.wednesday}
                onChange={handleChange}
                sx={{ marginLeft: 2 }}
              />
              <Checkbox
                name="thursday"
                checked={values.all || values.thursday}
                onChange={handleChange}
                sx={{ marginLeft: 2 }}
              />
              <Checkbox
                name="friday"
                checked={values.all || values.friday}
                onChange={handleChange}
                sx={{ marginLeft: 2 }}
              />
              <Checkbox
                name="saturday"
                checked={values.all || values.saturday}
                onChange={handleChange}
                sx={{ marginLeft: 2 }}
              />
              <Checkbox
                name="sunday"
                checked={values.all || values.sunday}
                onChange={handleChange}
                sx={{ marginLeft: 2 }}
              />
              <Checkbox
                checked={values.all}
                onChange={({ target: { checked: all } }) =>
                  setValues((l) => (all ? { ...l, all } : {}))
                }
                sx={{ marginLeft: 4.5 }}
              />
            </MDBox>
            <MDBox display="flex" justifyContent="flex-end">
              <MDButton color="info" onClick={handleSubmit}>
                Guardar
              </MDButton>
              <MDButton sx={{ marginLeft: 3, marginRight: 1 }} color="info">
                Cancelar
              </MDButton>
            </MDBox>
          </MDBox>
        </Grid>
      </Card>
    </Stack>
  );
}

export default NameForm;
