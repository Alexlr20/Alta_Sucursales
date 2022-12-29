/* eslint-disable react/prop-types */
/* eslint-disable no-console */
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
import { useState } from "react";
import {
  MenuItem,
  TextField,
  Checkbox,
  FormLabel,
  Box,
  Button,
} from "@mui/material";
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";

const initialCheckboxValues = {
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
  tipo_instruccion: "",
  nombre: "",
  meta: "",
  fecha_inicial: "",
  fecha_final: "",
  hora_inicial: "",
  hora_final: "",
  detalle: "",
};

function NameForm({ handleRefresh, handleShowAdd }) {
  const [formValues, setFormValues] = useState(initialFormValues);
  const [values, setValues] = useState(initialCheckboxValues);
  const [formErrors, setFormErrors] = useState({});
  const [testCheck, setTestCheck] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((v) => ({
      ...v,
      [name]: value,
    }));
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };

  const validate = (val) => {
    const errors = {};

    if (!val.nombre) errors.nombre = true;
    if (!val.meta) errors.meta = true;
    if (!val.hora_inicial) errors.hora_inicial = true;
    if (!val.hora_final) errors.hora_final = true;
    if (!val.detalle) errors.detalle = true;
    if (!val.tipo_instruccion) errors.tipo_instruccion = true;
    if (!val.fecha_inicial) errors.fecha_inicial = true;
    if (!val.fecha_final) errors.fecha_final = true;

    if (val.fecha_inicial > val.fecha_final) {
      errors.fecha_inicial = true;
      errors.fecha_final = true;
    }

    if (val.hora_inicial > val.hora_final) {
      errors.hora_inicial = true;
      errors.hora_final = true;
    }

    return errors;
  };

  const validateCheckboxes = (val) => {
    const errors = {};

    if (!Object.values(val).includes(true)) {
      errors.err = true;
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setTestCheck(validateCheckboxes(values));
    if (!Object.values(formErrors).includes(true) && !Object.values(testCheck).includes(true)) {
      console.log("No hay errores de checkboxes");

      const currentTime = new Date();
      const creationTime = `${currentTime.getDay()}/${currentTime.getMonth()}/${currentTime.getFullYear()} ${currentTime.getHours()}:${currentTime.getMinutes()}`;

      const days = [];
      if (values.monday) days.push("L");
      if (values.tuesday) days.push("M");
      if (values.wednesday) days.push("MI");
      if (values.thursday) days.push("J");
      if (values.friday) days.push("V");
      if (values.saturday) days.push("S");
      if (values.sunday) days.push("D");
      const daysToText = days.join(" ");

      const newMandate = {
        tipo: formValues.tipo_instruccion,
        nombre: formValues.nombre,
        cant: formValues.meta,
        detalles: formValues.detalle,
        fecha_inicial: formValues.fecha_final,
        fecha_final: formValues.fecha_final,
        hora_inicial: formValues.hora_inicial,
        hora_final: formValues.hora_final,

        dias: daysToText,
        visto: "",
        status: "",
        detalle: {
          fecha_creacion: creationTime,
          fecha_modificacion: null,
          fecha_terminado: null,
          fecha_autorizacion: null,
        },
      };
      console.log(newMandate);

      fetch("http://localhost:8000/mandates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMandate),
      }).catch((err) => console.log(err));

      handleRefresh();
      handleShowAdd();
      setFormValues(initialFormValues);
      setValues(initialCheckboxValues);
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const newFormErrors = { ...formErrors };
    delete newFormErrors[name];

    setFormErrors(newFormErrors);
  };

  const handleCheckboxBlur = (e) => {
    const { name } = e.target;
    const newCheckboxErrors = { ...testCheck };
    delete newCheckboxErrors[name];

    setTestCheck(newCheckboxErrors);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", padding: "1rem" }}>
      <Box
        sx={{
          padding: "1rem",
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gridTemplateRows: "repeat(4, auto)",
          gridTemplateAreas: `"nombre nombre meta sucBtn"
          "tInstruccion tInstruccion fInicial fFinal"
          "detalle detalle hInicial hFinal"
          "dActivos dActivos . ."`,
          gridColumnGap: "1rem",
          gridRowGap: "1rem",
        }}
      >
        <Box sx={{ gridArea: "tInstruccion" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Tipo de instrucción
          </MDTypography>

          <TextField
            fullWidth
            select
            name="tipo_instruccion"
            value={formValues.tipo_instruccion}
            onChange={handleInputChange}
            error={formErrors.tipo_instruccion}
            onBlur={handleBlur}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="Acción">Acción</MenuItem>
            <MenuItem value="Informativa">Informativa</MenuItem>
            <MenuItem value="Meta">Meta</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ gridArea: "nombre" }}>
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
        </Box>

        <Button
          style={{
            gridArea: "sucBtn",
            justifySelf: "start",
            alignSelf: "end",
            color: "#FFF",
            height: "50%",
          }}
          variant="contained"
          onClick={handleShowAdd}
        >
          Sucursales
        </Button>

        <Box sx={{ gridArea: "meta" }}>
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
            type="number"
          />
        </Box>

        <Box sx={{ gridArea: "fInicial" }}>
          <MDTypography variant="h6" fontWeight="medium">
            Fecha inicial
          </MDTypography>
          <TextField
            name="fecha_inicial"
            type="date"
            sx={{ marginTop: 2, marginRight: 3 }}
            value={formValues.fecha_inicial}
            onChange={handleInputChange}
            error={formErrors.fecha_inicial}
            onBlur={handleBlur}
          />
        </Box>

        <Box sx={{ gridArea: "fFinal" }}>
          <MDTypography variant="h6" fontWeight="medium">
            Fecha final
          </MDTypography>
          <TextField
            name="fecha_final"
            type="date"
            sx={{ marginTop: 2 }}
            value={formValues.fecha_final}
            onChange={handleInputChange}
            error={formErrors.fecha_final}
            onBlur={handleBlur}
          />
        </Box>
        <Box sx={{ gridArea: "detalle" }}>
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
        </Box>

        <Box sx={{ gridArea: "hInicial" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Hora inicial
          </MDTypography>
          <TextField
            name="hora_inicial"
            type="time"
            value={formValues.hora_inicial}
            onChange={handleInputChange}
            error={formErrors.hora_inicial}
            onBlur={handleBlur}
          />
        </Box>

        <Box sx={{ gridArea: "hFinal" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Hora final
          </MDTypography>
          <TextField
            name="hora_final"
            type="time"
            value={formValues.hora_final}
            onChange={handleInputChange}
            error={formErrors.hora_final}
            onBlur={handleBlur}
          />
        </Box>
        <Box sx={{ gridArea: "dActivos" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Dias activos
          </MDTypography>
          <MDBox
            mt={2}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box className="flexColCtr">
              <FormLabel error={testCheck.err}>D</FormLabel>
              <Checkbox
                name="sunday"
                checked={values.all || values.sunday}
                onChange={handleChange}
                onBlur={handleCheckboxBlur}
              />
            </Box>
            <Box className="flexColCtr">
              <FormLabel error={testCheck.err}>L</FormLabel>
              <Checkbox
                name="monday"
                checked={values.all || values.monday}
                onChange={handleChange}
                onBlur={handleCheckboxBlur}
              />
            </Box>
            <Box className="flexColCtr">
              <FormLabel error={testCheck.err}>M</FormLabel>
              <Checkbox
                name="tuesday"
                checked={values.all || values.tuesday}
                onChange={handleChange}
                onBlur={handleCheckboxBlur}
              />
            </Box>
            <Box className="flexColCtr">
              <FormLabel error={testCheck.err}>MI</FormLabel>
              <Checkbox
                name="wednesday"
                checked={values.all || values.wednesday}
                onChange={handleChange}
                onBlur={handleCheckboxBlur}
              />
            </Box>
            <Box className="flexColCtr">
              <FormLabel error={testCheck.err}>J</FormLabel>
              <Checkbox
                name="thursday"
                checked={values.all || values.thursday}
                onChange={handleChange}
                onBlur={handleCheckboxBlur}
              />
            </Box>
            <Box className="flexColCtr">
              <FormLabel error={testCheck.err}>V</FormLabel>
              <Checkbox
                name="friday"
                checked={values.all || values.friday}
                onChange={handleChange}
                onBlur={handleCheckboxBlur}
              />
            </Box>
            <Box className="flexColCtr">
              <FormLabel error={testCheck.err}>S</FormLabel>
              <Checkbox
                name="saturday"
                checked={values.all || values.saturday}
                onChange={handleChange}
                onBlur={handleCheckboxBlur}
              />
            </Box>
            <Box className="flexColCtr">
              <FormLabel error={testCheck.err}>Todos</FormLabel>
              <Checkbox
                checked={values.all}
                onChange={({ target: { checked: all } }) =>
                  setValues(() => (all ? { all } : { ...initialCheckboxValues }))
                }
                onBlur={handleCheckboxBlur}
              />
            </Box>
          </MDBox>
        </Box>
      </Box>

      {/* Botones */}
      <MDBox sx={12} mt={2} display="flex" justifyContent="flex-end">
        <MDButton color="info" onClick={handleSubmit}>
          Guardar
        </MDButton>
        <MDButton sx={{ marginLeft: 3 }} color="info">
          Cancelar
        </MDButton>
      </MDBox>
    </Box>
  );
}

export default NameForm;