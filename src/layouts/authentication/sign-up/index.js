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
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { TextField } from "@mui/material";
import MDButton from "components/MDButton";
import CoverLayout from "layouts/authentication/components/BasicSignUp";
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { asMuiTextField } from "layouts/mandates/components/SearchForm/asMuiTextField";
import useForm from "layouts/mandates/components/SearchForm/useForm";

function Cover() {
  const initialValues = {
    nombre: "",
    correo: "",
    contraseña: "",
  };
  const { register, validateForm } = useForm(initialValues);
  const navigate = useNavigate();
  // const emailRegex = /\S+@\S+\.\S+/;

  const navigateLogIn = () => {
    navigate("/authentication/sign-in");
  };

  const onSubmit = () => {
    if (validateForm()) {
      navigateLogIn();
      // Success process
    }
  };
  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Unete
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Pon tu correo y contraseña para registrarte
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <TextField
                type="text"
                label="Nombre"
                fullWidth
                {...asMuiTextField(register("nombre")((v) => v.length > 3))}
              />
            </MDBox>
            <MDBox mb={2}>
              <TextField
                type="email"
                label="Correo"
                fullWidth
                {...asMuiTextField(register("correo")((v) => v.length > 3))}
              />
            </MDBox>
            <MDBox mb={2}>
              <TextField
                type="password"
                label="Contraseña"
                fullWidth
                {...asMuiTextField(register("contraseña")((v) => v.length > 0))}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Acepto los&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terminos y Condiciones
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                Ya tengo una cuenta{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-in"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign In
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
