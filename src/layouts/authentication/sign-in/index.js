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
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicSignIn";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { TextField } from "@mui/material";
import { asMuiTextField } from "layouts/billing/components/SearchForm/asMuiTextField";
import useForm from "layouts/billing/components/SearchForm/useForm";

function Basic() {
  const initialValues = {
    usuario: "",
    contraseña: "",
  };
  const { register, validateForm } = useForm(initialValues);
  const [rememberMe, setRememberMe] = useState(false);
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const navigate = useNavigate();

  const navigateOrganigrama = () => {
    navigate("../Organigrama");
  };

  const onSubmit = () => {
    if (validateForm()) {
      // Success process
      navigateOrganigrama();
    } else {
      // Error p
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          display="flex"
          justifyContent="center"
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
          {/* <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid> */}
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <TextField
                type="email"
                label="Usuario"
                fullWidth
                {...asMuiTextField(register("usuario")((v) => v.length > 0))}
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
              <Switch checked={rememberMe} onChange={handleSetRememberMe} color="primary" />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Recuérdame
              </MDTypography>
            </MDBox>
            <MDBox display="flex" justifyContent="center" mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth onClick={onSubmit}>
                sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                No tienes una cuenta ?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
