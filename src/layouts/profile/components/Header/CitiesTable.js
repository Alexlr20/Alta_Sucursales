/* eslint-disable react/prop-types */
/* eslint-disable react/function-component-definition */
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

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDButton from "components/MDButton";
import { Icon } from "@mui/material";
// import MDBadge from "components/MDBadge";

// Images
// import team2 from "assets/images/team-2.jpg";

export default function data() {
  const InsertData = ({ image, name, calle }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={-1} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{calle}</MDTypography>
      </MDBox>
    </MDBox>
  );

  // eslint-disable-next-line no-empty-pattern
  const AccionesIcons = ({}) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDButton>
        <Icon fontSize="small" color="info">
          delete{" "}
        </Icon>
      </MDButton>
      <MDButton>
        <Icon fontSize="small" color="info">
          edit_note{" "}
        </Icon>
      </MDButton>
    </MDBox>
  );

  return {
    columns: [
      { Header: "Number", accessor: "Number" },
      { Header: "Nombre", accessor: "Nombre" },
      { Header: "Codigo", accessor: "Codigo" },
      { Header: "Acciones", accessor: "Acciones", align: "center" },
    ],

    rows: [
      {
        Number: <InsertData name="3" />,
        Nombre: <InsertData name="Nombre 3" />,
        Codigo: <InsertData name="Codigo 3" />,
        Acciones: <AccionesIcons />,
        // map: <Map />,
      },
    ],
  };
}
