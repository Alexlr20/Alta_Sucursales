import React, { useState } from "react";
import { Grid, TextField, Checkbox, FormLabel, MenuItem, Box } from "@mui/material";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

function MoreFilters() {
  const [formErrors, setFormErrors] = useState({});

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
  const [formValues, setFormValues] = useState(initialFormValues);

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
  const [values, setValues] = useState(initialValues);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((v) => ({
      ...v,
      [name]: value,
    }));
    // eslint-disable-next-line no-console
    console.log(value);
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    const newFormErrors = { ...formErrors };
    delete newFormErrors[name];

    setFormErrors(newFormErrors);
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setValues({ ...values, [name]: checked });
  };

  return (
    <Grid item xs={12} sx={{ marginTop: "3rem" }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(6, 1fr)",
          gridTemplateRows: "repeat(3, 1fr)",
          gridTemplateAreas: `"ciudad ciudad ciudad estado estado estado"
        "hInicial hInicial hFinal hFinal sucursal sucursal" 
        "dActivos dActivos dActivos . . ."`,
          gap: "1rem",
        }}
      >
        <Box sx={{ gridArea: "ciudad" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Ciudad:
          </MDTypography>

          <TextField
            select
            fullWidth
            name="ciudad"
            value={formValues.ciudad}
            onChange={handleInputChange}
            error={formErrors.ciudad}
            onBlur={handleBlur}
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
        <Box sx={{ gridArea: "estado" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Estado:
          </MDTypography>

          <TextField
            fullWidth
            name="estado"
            value={formValues.estado}
            onChange={handleInputChange}
            error={formErrors.estado}
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
        <Box sx={{ gridArea: "hInicial" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Hora inicial
          </MDTypography>
          <TextField
            fullWidth
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
            fullWidth
            name="hora_final"
            type="time"
            value={formValues.hora_final}
            onChange={handleInputChange}
            error={formErrors.hora_final}
            onBlur={handleBlur}
          />
        </Box>
        <Box sx={{ gridArea: "sucursal" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Area:
          </MDTypography>

          <TextField
            select
            fullWidth
            name="area"
            value={formValues.area}
            onChange={handleInputChange}
            error={formErrors.area}
            onBlur={handleBlur}
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
        <Box sx={{ gridArea: "dActivos" }}>
          <MDTypography variant="h6" fontWeight="medium" sx={{ marginBottom: 2 }}>
            Dias activos
          </MDTypography>
          <MDBox
            mt={2}
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(8, 1fr)",
              gridTemplateRows: "1fr",
              gridTemplateAreas: `"D L M MI J V S todos"`,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box className="flexColCtr" sx={{ gridArea: "D" }}>
              <FormLabel>D</FormLabel>
              <Checkbox
                name="sunday"
                checked={values.all || values.sunday}
                onChange={handleChange}
              />
            </Box>
            <Box className="flexColCtr" sx={{ gridArea: "L" }}>
              <FormLabel>L</FormLabel>
              <Checkbox
                name="monday"
                checked={values.all || values.monday}
                onChange={handleChange}
              />
            </Box>
            <Box className="flexColCtr" sx={{ gridArea: "M" }}>
              <FormLabel>M</FormLabel>
              <Checkbox
                name="tuesday"
                checked={values.all || values.tuesday}
                onChange={handleChange}
              />
            </Box>
            <Box className="flexColCtr" sx={{ gridArea: "MI" }}>
              <FormLabel>MI</FormLabel>
              <Checkbox
                name="wednesday"
                checked={values.all || values.wednesday}
                onChange={handleChange}
              />
            </Box>
            <Box className="flexColCtr" sx={{ gridArea: "J" }}>
              <FormLabel>J</FormLabel>
              <Checkbox
                name="thursday"
                checked={values.all || values.thursday}
                onChange={handleChange}
              />
            </Box>
            <Box className="flexColCtr" sx={{ gridArea: "V" }}>
              <FormLabel>V</FormLabel>
              <Checkbox
                name="friday"
                checked={values.all || values.friday}
                onChange={handleChange}
              />
            </Box>
            <Box className="flexColCtr" sx={{ gridArea: "S" }}>
              <FormLabel>S</FormLabel>
              <Checkbox
                name="saturday"
                checked={values.all || values.saturday}
                onChange={handleChange}
              />
            </Box>
            <Box className="flexColCtr" sx={{ gridArea: "todos" }}>
              <FormLabel>Todos</FormLabel>
              <Checkbox
                checked={values.all}
                onChange={({ target: { checked: all } }) =>
                  setValues(() => (all ? { all } : { ...initialValues }))
                }
              />
            </Box>
          </MDBox>
        </Box>
      </Box>
    </Grid>
  );
}

export default MoreFilters;
